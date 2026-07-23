# Copyright 2018 Kenichi Ishibashi (Original Work)
# Modifications Copyright 2026 MeLi (Li Junjie)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Modified by MeLi (Li Junjie):
#   - Changed EXTRA_EXPORTED_RUNTIME_METHODS to EXPORTED_RUNTIME_METHODS
#

CC := emcc
CXX := emcc

CXXFLAGS += -std=c++11 -Oz

OUTDIR := out

WOFF2_DIR := woff2

OBJDIR := $(OUTDIR)/obj
DISTDIR := dist/

.DEFAULT_GOAL := wasm

# brotli

BROTLI_DIR := $(WOFF2_DIR)/brotli
BROTLI_LIB_A := $(BROTLI_DIR)/libbrotli.a

$(BROTLI_LIB_A):
	CC=$(CC) $(MAKE) -C $(BROTLI_DIR) lib

# woff2

WOFF2_SRC_DIR = $(WOFF2_DIR)/src
WOFF2_SRC_FILES := font.cc \
  glyph.cc \
	normalize.cc \
	table_tags.cc \
	transform.cc \
	variable_length.cc \
	woff2_common.cc \
	woff2_dec.cc \
	woff2_enc.cc \
	woff2_out.cc

WOFF2_SRCS := $(addprefix $(WOFF2_SRC_DIR)/, $(WOFF2_SRC_FILES))
WOFF2_OBJS := $(addprefix $(OBJDIR)/, $(notdir $(WOFF2_SRCS:%.cc=%.o)))
WOFF2_DEPS := $(WOFF2_OBJS:%.o=%.d)
WOFF2_LIB_A := $(OBJDIR)/libwoff2.a

-include $(WOFF2_DEPS)

$(WOFF2_LIB_A): dirs $(WOFF2_OBJS)
	emar crs $(WOFF2_LIB_A) $(WOFF2_OBJS)

$(OBJDIR)/%.o: $(WOFF2_DIR)/src/%.cc
	emcc -c -MMD $(CXXFLAGS) -I$(BROTLI_DIR)/c/include -I$(WOFF2_DIR)/include -o $@ $<

# wasm

FFI_JS := $(DISTDIR)/ffi.js
FFI_OBJS := $(FFI_SRCS:%.cc=%.o)

wasm: $(WOFF2_LIB_A) $(BROTLI_LIB_A) ffi.cc
	emcc $(CXXFLAGS) -I$(WOFF2_DIR)/include ffi.cc -o $(FFI_JS) $(WOFF2_LIB_A) $(BROTLI_LIB_A) \
	  -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 \
	  -s EXPORTED_FUNCTIONS='["_malloc", "_free"]' \
	  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'

$(OBJDIR)/%.o: %.cc
	emcc -c -MMD $(CXXFLAGS) -I$(BROTLI_DIR)/c/include -I$(WOFF2_DIR)/include -o $@ $<

# others

.PHONY: clean

dirs:
	@mkdir -p $(OBJDIR)

clean:
	$(MAKE) -C $(BROTLI_DIR) clean
	@rm -rf $(OUTDIR)
