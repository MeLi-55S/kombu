/*
 * Copyright 2018 Kenichi Ishibashi (Original Work)
 * Modifications Copyright 2026 MeLi (Li Junjie)
 *
 * Kombu — OpenType/WOFF/WOFF2 Converter
 * Fork: https://github.com/MeLi-55S/kombu
 * Original: https://github.com/bashi/kombu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { Format, isValidFormat, getFilenameSuffix, getFontFormat } from './format';
import { convertOnWorker } from './convertworker';
import { Lang, t, setLang, getLang } from './i18n';
import JSZip from 'jszip';

async function fileToUint8Array(file: File): Promise<Uint8Array> {
  const fileReader = new FileReader();
  const promise = new Promise<Uint8Array>((resolve, reject) => {
    fileReader.addEventListener('load', () => {
      const result = fileReader.result;
      if (result instanceof ArrayBuffer) {
        resolve(new Uint8Array(result));
      } else {
        throw new Error('readAsArrayBuffer() returns non ArrayBuffer result');
      }
    });
    fileReader.addEventListener('error', (e) => reject(e));
  });
  fileReader.readAsArrayBuffer(file);
  return promise;
}

function createDownloadLink(basename: string, data: Uint8Array): HTMLAnchorElement {
  const blob = new Blob([data]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const suffix = getFilenameSuffix(data);
  link.download = `${basename}.${suffix}`;
  link.textContent = `${t('download')} ${basename}.${suffix}`;
  return link;
}

function getBasename(filename: string): string {
  const suffixPos = filename.lastIndexOf('.');
  if (suffixPos === -1) return filename;
  return filename.substr(0, suffixPos);
}

const BYTE_SUFFIXES = [' B', ' kB', ' MB'];
const BYTE_MARGIN = 1024;

function formatFilesize(amount: number): string {
  let index = 0;
  while (amount > 1000 + BYTE_MARGIN && index < BYTE_SUFFIXES.length) {
    amount /= 1000;
    index += 1;
  }
  const suffix = BYTE_SUFFIXES[index];
  if (amount > 100) {
    return amount.toFixed(0) + suffix;
  } else {
    return amount.toFixed(1) + suffix;
  }
}

function formatProcessTime(t: number): string {
  if (t < 1000) {
    return t.toFixed(0) + 'ms';
  }
  const sec = t / 1000;
  return sec.toFixed(1) + 's';
}

function formatConversionRatio(before: number, after: number): string {
  const el = document.createElement('span');
  const ratio = (after / before) * 100;
  el.textContent = ratio.toFixed(1) + '%';
  if (ratio < 100) {
    el.style.color = 'var(--color-success)';
    el.style.fontWeight = 'bold';
  } else if (ratio > 100) {
    el.style.color = 'var(--color-danger)';
    el.style.fontWeight = 'bold';
  }
  return el.outerHTML;
}

/** Format name for display */
function formatDisplayName(format: Format): string {
  switch (format) {
    case Format.OTF: return 'TTF / OTF';
    case Format.WOFF: return 'WOFF';
    case Format.WOFF2: return 'WOFF2';
    case Format.UNSUPPORTED: return t('unsupported');
  }
}

/** Detect font format from raw bytes */
function detectFormat(data: Uint8Array): Format {
  try {
    // Need at least 4 bytes for magic number
    if (data.byteLength < 4) return Format.UNSUPPORTED;
    return getFontFormat(data);
  } catch {
    return Format.UNSUPPORTED;
  }
}

interface FileEntry {
  file: File;
  data: Uint8Array;
  detectedFormat: Format;
}

// TODO: Avoid a god object.
class App {
  inputFileEl: HTMLInputElement;
  selectFileButton: HTMLButtonElement;
  convertResultEl: Element;
  selectedFontInfoEl: Element;
  convertButton: HTMLButtonElement;
  spinnerEl: Element;
  errorMessageEl: Element;
  langToggle: HTMLSelectElement;
  downloadAllButton: HTMLButtonElement;

  selectedFiles: FileEntry[] = [];
  conversionResults: Array<{basename: string; data: Uint8Array}> = [];

  constructor() {
    const inputFileEl = document.querySelector('#input-file');
    if (!(inputFileEl instanceof HTMLInputElement)) {
      throw new Error('No input-file element');
    }
    const selectFileButton = document.querySelector('#select-file-button');
    if (!(selectFileButton instanceof HTMLButtonElement)) {
      throw new Error('No select-file-button element');
    }
    const convertResultEl = document.querySelector('#convert-result-container');
    if (!convertResultEl) {
      throw new Error('No convert result container');
    }
    const selectedFontInfoEl = document.querySelector('#selected-font-info');
    if (!selectedFontInfoEl) {
      throw new Error('No selected font info element');
    }
    const convertButton = document.querySelector('#convert-button');
    if (!(convertButton instanceof HTMLButtonElement)) {
      throw new Error('No convert button element');
    }
    const spinnerEl = document.querySelector('#spinner');
    if (!spinnerEl) {
      throw new Error('No spinner element');
    }
    const errorMessageEl = document.querySelector('#error-message-container');
    if (!errorMessageEl) {
      throw new Error('No error message container');
    }
    const langToggle = document.querySelector('#lang-toggle');
    if (!(langToggle instanceof HTMLSelectElement)) {
      throw new Error('No language toggle element');
    }

    this.inputFileEl = inputFileEl;
    this.selectFileButton = selectFileButton;
    this.convertResultEl = convertResultEl;
    this.selectedFontInfoEl = selectedFontInfoEl;
    this.convertButton = convertButton;
    this.spinnerEl = spinnerEl;
    this.errorMessageEl = errorMessageEl;
    this.langToggle = langToggle;

    const downloadBtn = document.querySelector('#download-all-button');
    if (!(downloadBtn instanceof HTMLButtonElement)) {
      throw new Error('No download-all-button element');
    }
    this.downloadAllButton = downloadBtn;

    this.convertButton.disabled = true;

    this.selectFileButton.addEventListener('click', async () => {
      const files = await this.chooseFiles();
      await this.onFilesSelected(files);
    });

    this.convertButton.addEventListener('click', () => {
      this.startConversions();
    });

    this.langToggle.addEventListener('change', () => {
      setLang(this.langToggle.value as Lang);
      this.updateLanguage();
    });

    this.downloadAllButton.addEventListener('click', () => {
      this.downloadAllAsZip();
    });

    // Read language from URL query (?lang=xx)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang') as Lang | null;
    if (urlLang && ['zh','en','ja','es','fr','de','pt','ko'].includes(urlLang)) {
      setLang(urlLang);
    }

    // Initialize language display
    this.updateLanguage();
  }

  private updateLanguage(): void {
    const lang = getLang();

    // Update lang attribute
    document.documentElement.lang = lang;

    // Sync URL with language parameter (for multi-language SEO)
    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') !== lang) {
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.toString());
    }

    // Sync dropdown value
    this.langToggle.value = lang;

    // Static text from template
    document.title = t('title');
    this.setText('#subtitle-text', t('subtitle'));
    this.setText('.dropzone-label', t('dropzoneLabel'));
    this.setText('.dropzone-hint', t('dropzoneHint'));
    this.setText('#convert-button', t('convert'));
    this.setText('#spinner-text', t('converting'));
    this.setText('#spinner-hint', t('convertHint'));

    // Format radio labels
    const otfLabel = document.querySelector('label[for="output-format-otf"]');
    const woffLabel = document.querySelector('label[for="output-format-woff"]');
    const woff2Label = document.querySelector('label[for="output-format-woff2"]');
    if (otfLabel) otfLabel.textContent = t('formatOtf');
    if (woffLabel) woffLabel.textContent = t('formatWoff');
    if (woff2Label) woff2Label.textContent = t('formatWoff2');

    // Footer links
    const issueLink = document.querySelector('#issue-link');
    if (issueLink) issueLink.textContent = t('reportIssue');
    this.setText('#footer-copyright', `${t('forkBy')} MeLi (Li Junjie) · ${t('originalBy')} Kenichi Ishibashi · ${t('license')}`);
    this.setText('#footer-blog', t('blogLink'));

    // Download all button
    this.downloadAllButton.textContent = t('downloadAll');

    // Re-render file list with current language
    this.renderFileList();
  }

  private setText(selector: string, text: string): void {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  private async chooseFiles(): Promise<FileList> {
    return new Promise((resolve, reject) => {
      const listener = () => {
        this.inputFileEl.removeEventListener('change', listener);
        if (this.inputFileEl.files === null || this.inputFileEl.files.length === 0) {
          reject('No file specified');
          return;
        }
        resolve(this.inputFileEl.files);
      };
      this.inputFileEl.addEventListener('change', listener);
      this.inputFileEl.click();
    });
  }

  private async onFilesSelected(files: FileList) {
    this.selectedFiles = [];

    // Read all files and detect formats
    const entries: FileEntry[] = [];
    for (const file of files) {
      try {
        const data = await fileToUint8Array(file);
        const detectedFormat = detectFormat(data);
        entries.push({ file, data, detectedFormat });
      } catch {
        entries.push({ file, data: new Uint8Array(0), detectedFormat: Format.UNSUPPORTED });
      }
    }

    this.selectedFiles = entries;
    this.renderFileList();

    // Enable convert button only if at least one valid font is detected
    const hasValid = entries.some(e => e.detectedFormat !== Format.UNSUPPORTED && e.data.byteLength >= 4);
    this.convertButton.disabled = !hasValid;
  }

  private renderFileList(): void {
    this.selectedFontInfoEl.innerHTML = '';
    const hasAny = this.selectedFiles.length > 0;

    for (const entry of this.selectedFiles) {
      const fileSize = formatFilesize(entry.file.size);
      const isValid = entry.detectedFormat !== Format.UNSUPPORTED && entry.data.byteLength >= 4;

      const el = document.createElement('div');
      el.className = 'file-info-item';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'file-info-name';
      nameSpan.textContent = entry.file.name;

      const metaSpan = document.createElement('span');
      metaSpan.className = 'file-info-meta';
      metaSpan.textContent = `(${fileSize})`;

      const badge = document.createElement('span');
      if (isValid) {
        badge.className = 'file-info-badge badge-ok';
        badge.textContent = `${t('detected')}: ${formatDisplayName(entry.detectedFormat)}`;
      } else {
        badge.className = 'file-info-badge badge-err';
        badge.textContent = t('unsupported');
      }

      el.appendChild(nameSpan);
      el.appendChild(metaSpan);
      el.appendChild(badge);
      this.selectedFontInfoEl.appendChild(el);
    }

    if (!hasAny && this.convertButton.disabled) {
      this.selectedFontInfoEl.innerHTML = '';
    }
  }

  private async startConversions() {
    if (this.selectedFiles.length === 0) return;

    const outputFormatEl = document.querySelector('input[name=output-format]:checked');
    if (!(outputFormatEl instanceof HTMLInputElement)) {
      throw new Error('No output format element');
    }

    const format = outputFormatEl.value;
    if (!isValidFormat(format)) {
      throw new Error(`Invalid font format: ${format}`);
    }

    // Filter out unsupported files
    const validFiles = this.selectedFiles.filter(
      e => e.detectedFormat !== Format.UNSUPPORTED && e.data.byteLength >= 4
    );

    if (validFiles.length === 0) {
      this.errorMessageEl.textContent = t('noValidFonts');
      this.errorMessageEl.classList.remove('error-message-off');
      return;
    }

    this.convertButton.disabled = true;
    this.conversionResults = [];
    this.downloadAllButton.classList.add('download-all-off');

    // Clear conversion status.
    this.convertResultEl.innerHTML = '';
    this.errorMessageEl.innerHTML = '';
    this.errorMessageEl.classList.add('error-message-off');
    this.spinnerEl.classList.remove('spinner-off');

    try {
      for (let entry of validFiles) {
        await this.convertSingleFile(entry, format);
      }
    } catch (exception) {
      console.error(exception);
      this.errorMessageEl.textContent = exception.message;
      this.errorMessageEl.classList.remove('error-message-off');
      this.convertResultEl.innerHTML = '';
    } finally {
      this.spinnerEl.classList.add('spinner-off');
      this.convertButton.disabled = false;
    }
  }

  private async convertSingleFile(entry: FileEntry, format: Format) {
    const data = entry.data;
    const originalByteLength = data.byteLength;
    const result = await convertOnWorker(data, format);
    const output = result.output;

    const originalFileSize = formatFilesize(originalByteLength);
    const convertedFileSize = formatFilesize(output.byteLength);
    const processTime = formatProcessTime(result.processTime);
    const ratio = formatConversionRatio(originalByteLength, output.byteLength);

    const summaryEl = document.createElement('div');
    summaryEl.classList.add('convert-summary');

    const sourceLabel = formatDisplayName(entry.detectedFormat);
    const targetLabel = formatDisplayName(format as Format);

    summaryEl.innerHTML = `
    <div>${entry.file.name} — ${sourceLabel} → ${targetLabel}</div>
    <div>${t('sizeComparison')}: ${originalFileSize} → ${convertedFileSize} (${ratio})</div>
    <div>${t('processTime')}: ${processTime}</div>
    `;
    this.convertResultEl.appendChild(summaryEl);

    const basename = getBasename(entry.file.name);
    const link = createDownloadLink(basename, output);
    this.convertResultEl.appendChild(link);

    // Track for ZIP download
    this.conversionResults.push({ basename, data: output });
    if (this.conversionResults.length > 1) {
      this.downloadAllButton.classList.remove('download-all-off');
    }
  }

  private async downloadAllAsZip() {
    if (this.conversionResults.length < 2) return;

    const zip = new JSZip();
    for (const { basename, data } of this.conversionResults) {
      const suffix = getFilenameSuffix(data);
      zip.file(`${basename}.${suffix}`, data.buffer);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fonts.zip';
    a.click();
    URL.revokeObjectURL(url);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
