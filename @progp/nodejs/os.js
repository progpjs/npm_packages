"use strict";
/*
 * (C) Copyright 2024 Johan Michel PIQUET, France (https://johanpiquet.fr/).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.oseol = exports.tmpdir = exports.hostname = exports.homedir = exports.platform = exports.machine = exports.arch = void 0;
const modProcess = progpGetModule("nodejsModProcess");
const modOS = progpGetModule("nodejsModOS");
exports.arch = modProcess.arch;
exports.machine = modProcess.arch;
exports.platform = modProcess.platform;
exports.homedir = modOS.homeDir;
exports.hostname = modOS.hostName;
exports.tmpdir = modOS.tempDir;
exports.oseol = "\r";
exports.default = {
    arch: exports.arch,
    machine: exports.machine,
    platform: exports.platform,
    homedir: exports.homedir,
    hostname: exports.hostname,
    tmpdir: exports.tmpdir,
    oseol: exports.oseol
};
