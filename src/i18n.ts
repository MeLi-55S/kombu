/*
 * Copyright 2026 MeLi (Li Junjie)
 *
 * Kombu — OpenType/WOFF/WOFF2 Converter
 * Fork: https://github.com/MeLi-55S/kombu
 * Original: https://github.com/bashi/kombu (Kenichi Ishibashi)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

export type Lang = 'zh' | 'en' | 'ja' | 'es' | 'fr' | 'de' | 'pt' | 'ko' | 'it' | 'ru' | 'vi' | 'th' | 'pl' | 'tr';

export interface LangOption {
  code: Lang;
  label: string;
}

export const LANGUAGES: LangOption[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'ko', label: '한국어' },
  { code: 'it', label: 'Italiano' },
  { code: 'ru', label: 'Русский' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ไทย' },
  { code: 'pl', label: 'Polski' },
  { code: 'tr', label: 'Türkçe' },
];

export interface I18nStrings {
  title: string;
  subtitle: string;
  dropzoneLabel: string;
  dropzoneHint: string;
  formatOtf: string;
  formatWoff: string;
  formatWoff2: string;
  convert: string;
  converting: string;
  convertHint: string;
  sizeComparison: string;
  processTime: string;
  download: string;
  downloadAll: string;
  reportIssue: string;
  forkBy: string;
  originalBy: string;
  license: string;
  detected: string;
  unsupported: string;
  noValidFonts: string;
  file: string;
  formatLabel: string;
  sourceFormat: string;
  blogLink: string;
}

const zh: I18nStrings = {
  title: 'MeLi Kombu — 免费在线字体格式转换工具（TTF/OTF/WOFF/WOFF2 互转）',
  subtitle: '在 TTF / OTF / WOFF / WOFF2 之间互相转换字体，全程在浏览器本地完成，无需上传。',
  dropzoneLabel: '选择字体文件或将文件拖拽到这里',
  dropzoneHint: '支持 .ttf、.otf、.woff、.woff2 — 可一次选择多个文件',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: '开始转换',
  converting: '正在转换',
  convertHint: '如果转换的字体文件较大，可能需要几分钟时间。',
  sizeComparison: '大小对比',
  processTime: '处理耗时',
  download: '下载',
  downloadAll: '全部打包下载 (ZIP)',
  reportIssue: '反馈问题',
  forkBy: 'Fork 维护',
  originalBy: '原作',
  license: '基于 Apache 2.0 协议开源',
  detected: '已检测',
  unsupported: '不支持',
  noValidFonts: '没有可转换的有效字体文件',
  file: '文件',
  formatLabel: '格式',
  sourceFormat: '源格式',
  blogLink: '不妨去看看站长的 blog！(blog.melichem.cn)',
};

const en: I18nStrings = {
  title: 'MeLi Kombu — Free Online Font Format Converter (TTF/OTF/WOFF/WOFF2)',
  subtitle: 'Convert fonts between TTF / OTF / WOFF / WOFF2 — all in your browser, no upload needed.',
  dropzoneLabel: 'Choose fonts or drop them here',
  dropzoneHint: 'Supports .ttf, .otf, .woff, .woff2 — multiple files allowed',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Convert',
  converting: 'Converting',
  convertHint: 'It may take several minutes when you convert a large font.',
  sizeComparison: 'Size comparison',
  processTime: 'Process time',
  download: 'Download',
  downloadAll: 'Download all (ZIP)',
  reportIssue: 'Report issue',
  forkBy: 'Fork by',
  originalBy: 'Original by',
  license: 'Licensed under Apache 2.0',
  detected: 'Detected',
  unsupported: 'Unsupported',
  noValidFonts: 'No valid font files to convert',
  file: 'File',
  formatLabel: 'Format',
  sourceFormat: 'Source format',
  blogLink: 'Check out the owner\'s blog! (blog.melichem.cn)',
};

const ja: I18nStrings = {
  title: 'MeLi Kombu — 無料オンラインフォント形式変換ツール（TTF/OTF/WOFF/WOFF2）',
  subtitle: 'TTF / OTF / WOFF / WOFF2 形式のフォントを相互変換。ブラウザ内で完結し、アップロード不要。',
  dropzoneLabel: 'フォントファイルを選択するか、ここにドラッグ＆ドロップ',
  dropzoneHint: '対応形式: .ttf, .otf, .woff, .woff2 — 複数ファイル対応',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: '変換開始',
  converting: '変換中',
  convertHint: '大きなフォントファイルの変換には数分かかることがあります。',
  sizeComparison: 'サイズ比較',
  processTime: '処理時間',
  download: 'ダウンロード',
  downloadAll: 'すべて ZIP でダウンロード',
  reportIssue: '問題を報告',
  forkBy: 'Fork',
  originalBy: 'オリジナル作者',
  license: 'Apache 2.0 ライセンス',
  detected: '検出',
  unsupported: '非対応',
  noValidFonts: '変換可能なフォントファイルがありません',
  file: 'ファイル',
  formatLabel: '形式',
  sourceFormat: '元の形式',
  blogLink: 'ブログも覗いてみてください！(blog.melichem.cn)',
};

const es: I18nStrings = {
  title: 'MeLi Kombu — Conversor Online Gratuito de Fuentes (TTF/OTF/WOFF/WOFF2)',
  subtitle: 'Convierte fuentes entre TTF / OTF / WOFF / WOFF2 — todo en tu navegador, sin necesidad de subir archivos.',
  dropzoneLabel: 'Selecciona archivos de fuente o arrástralos aquí',
  dropzoneHint: 'Soporta .ttf, .otf, .woff, .woff2 — múltiples archivos permitidos',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Convertir',
  converting: 'Convirtiendo',
  convertHint: 'Puede tomar varios minutos al convertir una fuente grande.',
  sizeComparison: 'Comparación de tamaño',
  processTime: 'Tiempo de proceso',
  download: 'Descargar',
  downloadAll: 'Descargar todo (ZIP)',
  reportIssue: 'Reportar problema',
  forkBy: 'Fork por',
  originalBy: 'Original por',
  license: 'Licencia Apache 2.0',
  detected: 'Detectado',
  unsupported: 'No compatible',
  noValidFonts: 'No hay archivos de fuente válidos para convertir',
  file: 'Archivo',
  formatLabel: 'Formato',
  sourceFormat: 'Formato origen',
  blogLink: '¡También visita el blog del dueño! (blog.melichem.cn)',
};

const fr: I18nStrings = {
  title: 'MeLi Kombu — Convertisseur de Polices en Ligne Gratuit (TTF/OTF/WOFF/WOFF2)',
  subtitle: 'Convertissez des polices entre TTF / OTF / WOFF / WOFF2 — tout dans votre navigateur, sans téléchargement.',
  dropzoneLabel: 'Choisissez des fichiers de police ou déposez-les ici',
  dropzoneHint: 'Prend en charge .ttf, .otf, .woff, .woff2 — plusieurs fichiers autorisés',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Convertir',
  converting: 'Conversion en cours',
  convertHint: 'Cela peut prendre plusieurs minutes pour une police volumineuse.',
  sizeComparison: 'Comparaison de taille',
  processTime: 'Temps de traitement',
  download: 'Télécharger',
  downloadAll: 'Tout télécharger (ZIP)',
  reportIssue: 'Signaler un problème',
  forkBy: 'Fork par',
  originalBy: 'Original par',
  license: 'Sous licence Apache 2.0',
  detected: 'Détecté',
  unsupported: 'Non pris en charge',
  noValidFonts: 'Aucun fichier de police valide à convertir',
  file: 'Fichier',
  formatLabel: 'Format',
  sourceFormat: 'Format source',
  blogLink: 'Découvrez aussi le blog du propriétaire ! (blog.melichem.cn)',
};

const de: I18nStrings = {
  title: 'MeLi Kombu — Kostenloser Online Schriftarten Konverter (TTF/OTF/WOFF/WOFF2)',
  subtitle: 'Konvertieren Sie Schriftarten zwischen TTF / OTF / WOFF / WOFF2 — alles in Ihrem Browser, kein Upload nötig.',
  dropzoneLabel: 'Schriftartdateien auswählen oder hierher ziehen',
  dropzoneHint: 'Unterstützt .ttf, .otf, .woff, .woff2 — mehrere Dateien erlaubt',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Konvertieren',
  converting: 'Konvertiere',
  convertHint: 'Bei großen Schriftarten kann dies einige Minuten dauern.',
  sizeComparison: 'Größenvergleich',
  processTime: 'Verarbeitungszeit',
  download: 'Herunterladen',
  downloadAll: 'Alle herunterladen (ZIP)',
  reportIssue: 'Problem melden',
  forkBy: 'Fork von',
  originalBy: 'Original von',
  license: 'Lizenziert unter Apache 2.0',
  detected: 'Erkannt',
  unsupported: 'Nicht unterstützt',
  noValidFonts: 'Keine gültigen Schriftartdateien zum Konvertieren',
  file: 'Datei',
  formatLabel: 'Format',
  blogLink: 'Schau auch im Blog des Betreibers vorbei! (blog.melichem.cn)',
  sourceFormat: 'Quellformat',
};

const pt: I18nStrings = {
  title: 'MeLi Kombu — Conversor de Fontes Online Grátis (TTF/OTF/WOFF/WOFF2)',
  subtitle: 'Converta fontes entre TTF / OTF / WOFF / WOFF2 — tudo no seu navegador, sem necessidade de upload.',
  dropzoneLabel: 'Selecione arquivos de fonte ou arraste-os para cá',
  dropzoneHint: 'Suporta .ttf, .otf, .woff, .woff2 — múltiplos arquivos permitidos',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Converter',
  converting: 'Convertendo',
  convertHint: 'Pode levar alguns minutos ao converter uma fonte grande.',
  sizeComparison: 'Comparação de tamanho',
  processTime: 'Tempo de processamento',
  download: 'Baixar',
  downloadAll: 'Baixar tudo (ZIP)',
  reportIssue: 'Reportar problema',
  forkBy: 'Fork por',
  originalBy: 'Original por',
  license: 'Licenciado sob Apache 2.0',
  detected: 'Detectado',
  unsupported: 'Não suportado',
  noValidFonts: 'Nenhum arquivo de fonte válido para converter',
  file: 'Arquivo',
  blogLink: 'Confira também o blog do proprietário! (blog.melichem.cn)',
  formatLabel: 'Formato',
  sourceFormat: 'Formato original',
};

const ko: I18nStrings = {
  title: 'MeLi Kombu — 무료 온라인 폰트 형식 변환 도구（TTF/OTF/WOFF/WOFF2）',
  subtitle: 'TTF / OTF / WOFF / WOFF2 간 글꼴 변환 — 모두 브라우저에서 처리되며 업로드가 필요 없습니다.',
  dropzoneLabel: '글꼴 파일을 선택하거나 여기로 끌어다 놓으세요',
  dropzoneHint: '지원 형식: .ttf, .otf, .woff, .woff2 — 여러 파일 선택 가능',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: '변환 시작',
  converting: '변환 중',
  convertHint: '큰 글꼴 파일을 변환할 때는 몇 분 정도 걸릴 수 있습니다.',
  sizeComparison: '크기 비교',
  processTime: '처리 시간',
  download: '다운로드',
  downloadAll: '모두 ZIP으로 다운로드',
  reportIssue: '문제 신고',
  forkBy: 'Fork',
  originalBy: '원작자',
  license: 'Apache 2.0 라이선스',
  detected: '감지됨',
  unsupported: '지원 안 함',
  noValidFonts: '변환할 수 있는 유효한 글꼴 파일이 없습니다',
  blogLink: '블로그도 방문해보세요! (blog.melichem.cn)',
  file: '파일',
  formatLabel: '형식',
  sourceFormat: '원본 형식',
};

const it: I18nStrings = {
  title: 'MeLi Kombu',
  subtitle: 'Converti font tra TTF / OTF / WOFF / WOFF2 — tutto nel tuo browser, senza bisogno di caricare file.',
  dropzoneLabel: 'Seleziona file di font o trascinali qui',
  dropzoneHint: 'Supporta .ttf, .otf, .woff, .woff2 — file multipli consentiti',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Converti',
  converting: 'Conversione in corso',
  convertHint: 'Potrebbero volerci alcuni minuti per font di grandi dimensioni.',
  sizeComparison: 'Confronto dimensioni',
  processTime: 'Tempo di elaborazione',
  download: 'Scarica',
  downloadAll: 'Scarica tutto (ZIP)',
  reportIssue: 'Segnala problema',
  forkBy: 'Fork di',
  originalBy: 'Originale di',
  license: 'Licenza Apache 2.0',
  detected: 'Rilevato',
  unsupported: 'Non supportato',
  noValidFonts: 'Nessun file di font valido da convertire',
  blogLink: 'Visita anche il blog del proprietario! (blog.melichem.cn)',
  file: 'File',
  formatLabel: 'Formato',
  sourceFormat: 'Formato sorgente',
};

const ru: I18nStrings = {
  title: 'MeLi Kombu',
  subtitle: 'Конвертируйте шрифты между TTF / OTF / WOFF / WOFF2 — всё в браузере, без загрузки на сервер.',
  dropzoneLabel: 'Выберите файлы шрифтов или перетащите их сюда',
  dropzoneHint: 'Поддерживает .ttf, .otf, .woff, .woff2 — несколько файлов',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Конвертировать',
  converting: 'Конвертация',
  convertHint: 'Для больших шрифтов может потребоваться несколько минут.',
  sizeComparison: 'Сравнение размеров',
  processTime: 'Время обработки',
  download: 'Скачать',
  downloadAll: 'Скачать всё (ZIP)',
  reportIssue: 'Сообщить о проблеме',
  forkBy: 'Форк от',
  originalBy: 'Оригинал от',
  license: 'Лицензия Apache 2.0',
  detected: 'Обнаружен',
  unsupported: 'Не поддерживается',
  noValidFonts: 'Нет подходящих файлов шрифтов для конвертации',
  blogLink: 'Загляните в блог владельца! (blog.melichem.cn)',
  file: 'Файл',
  formatLabel: 'Формат',
  sourceFormat: 'Исходный формат',
};

const vi: I18nStrings = {
  title: 'MeLi Kombu',
  subtitle: 'Chuyển đổi phông chữ giữa TTF / OTF / WOFF / WOFF2 — tất cả trong trình duyệt, không cần tải lên.',
  dropzoneLabel: 'Chọn tệp phông chữ hoặc kéo thả vào đây',
  dropzoneHint: 'Hỗ trợ .ttf, .otf, .woff, .woff2 — cho phép nhiều tệp',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Chuyển đổi',
  converting: 'Đang chuyển đổi',
  convertHint: 'Có thể mất vài phút khi chuyển đổi phông chữ lớn.',
  sizeComparison: 'So sánh kích thước',
  processTime: 'Thời gian xử lý',
  download: 'Tải xuống',
  downloadAll: 'Tải tất cả (ZIP)',
  reportIssue: 'Báo cáo vấn đề',
  forkBy: 'Fork bởi',
  originalBy: 'Bản gốc bởi',
  license: 'Giấy phép Apache 2.0',
  detected: 'Đã phát hiện',
  unsupported: 'Không hỗ trợ',
  noValidFonts: 'Không có tệp phông chữ hợp lệ để chuyển đổi',
  blogLink: 'Ghé thăm blog của chủ sở hữu! (blog.melichem.cn)',
  file: 'Tệp',
  formatLabel: 'Định dạng',
  sourceFormat: 'Định dạng nguồn',
};

const th: I18nStrings = {
  title: 'MeLi Kombu',
  subtitle: 'แปลงฟอนต์ระหว่าง TTF / OTF / WOFF / WOFF2 — ทั้งหมดในเบราว์เซอร์ของคุณ ไม่ต้องอัปโหลด',
  dropzoneLabel: 'เลือกไฟล์ฟอนต์หรือลากมาวางที่นี่',
  dropzoneHint: 'รองรับ .ttf, .otf, .woff, .woff2 — เลือกหลายไฟล์ได้',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'แปลง',
  converting: 'กำลังแปลง',
  convertHint: 'อาจใช้เวลาหลายนาทีเมื่อแปลงฟอนต์ขนาดใหญ่',
  sizeComparison: 'เปรียบเทียบขนาด',
  processTime: 'เวลาที่ใช้',
  download: 'ดาวน์โหลด',
  downloadAll: 'ดาวน์โหลดทั้งหมด (ZIP)',
  reportIssue: 'รายงานปัญหา',
  forkBy: 'Fork โดย',
  originalBy: 'ต้นฉบับโดย',
  license: 'สัญญาอนุญาต Apache 2.0',
  detected: 'ตรวจพบ',
  unsupported: 'ไม่รองรับ',
  noValidFonts: 'ไม่มีไฟล์ฟอนต์ที่ถูกต้องสำหรับการแปลง',
  blogLink: 'ลองดูบล็อกของผู้ดูแลสิ! (blog.melichem.cn)',
  file: 'ไฟล์',
  formatLabel: 'รูปแบบ',
  sourceFormat: 'รูปแบบต้นทาง',
};

const pl: I18nStrings = {
  title: 'MeLi Kombu',
  subtitle: 'Konwertuj czcionki między TTF / OTF / WOFF / WOFF2 — wszystko w przeglądarce, bez wysyłania plików.',
  dropzoneLabel: 'Wybierz pliki czcionek lub przeciągnij je tutaj',
  dropzoneHint: 'Obsługuje .ttf, .otf, .woff, .woff2 — wiele plików',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Konwertuj',
  converting: 'Konwersja',
  convertHint: 'Może to zająć kilka minut w przypadku dużej czcionki.',
  sizeComparison: 'Porównanie rozmiarów',
  processTime: 'Czas przetwarzania',
  download: 'Pobierz',
  downloadAll: 'Pobierz wszystko (ZIP)',
  reportIssue: 'Zgłoś problem',
  forkBy: 'Fork od',
  originalBy: 'Oryginał od',
  license: 'Licencja Apache 2.0',
  detected: 'Wykryto',
  unsupported: 'Nieobsługiwany',
  noValidFonts: 'Brak prawidłowych plików czcionek do konwersji',
  blogLink: 'Zajrzyj na blog właściciela! (blog.melichem.cn)',
  file: 'Plik',
  formatLabel: 'Format',
  sourceFormat: 'Format źródłowy',
};

const tr: I18nStrings = {
  title: 'MeLi Kombu',
  subtitle: 'Yazı tiplerini TTF / OTF / WOFF / WOFF2 arasında dönüştürün — tamamen tarayıcınızda, yükleme gerektirmez.',
  dropzoneLabel: 'Yazı tipi dosyalarını seçin veya buraya sürükleyin',
  dropzoneHint: '.ttf, .otf, .woff, .woff2 destekler — birden çok dosya',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Dönüştür',
  converting: 'Dönüştürülüyor',
  convertHint: 'Büyük bir yazı tipini dönüştürürken birkaç dakika sürebilir.',
  sizeComparison: 'Boyut karşılaştırması',
  processTime: 'İşlem süresi',
  download: 'İndir',
  downloadAll: 'Tümünü indir (ZIP)',
  reportIssue: 'Sorun bildir',
  forkBy: 'Fork:',
  originalBy: 'Orijinal:',
  license: 'Apache 2.0 Lisansı',
  detected: 'Algılandı',
  unsupported: 'Desteklenmiyor',
  noValidFonts: 'Dönüştürülecek geçerli yazı tipi dosyası yok',
  blogLink: 'Sahibinin bloguna da göz atın! (blog.melichem.cn)',
  file: 'Dosya',
  formatLabel: 'Biçim',
  sourceFormat: 'Kaynak biçim',
};

const strings: Record<Lang, I18nStrings> = { zh, en, ja, es, fr, de, pt, ko, it, ru, vi, th, pl, tr };

let currentLang: Lang = 'zh';

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
}

export function t<K extends keyof I18nStrings>(key: K): I18nStrings[K] {
  return strings[currentLang][key];
}
