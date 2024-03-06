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
exports.execArgv = exports.ppid = exports.pid = exports.platform = exports.arch = exports.execPath = exports.argv0 = exports.argv = exports.exit = exports.env = exports.kill = exports.nextTick = exports.getuid = exports.chdir = exports.cwd = void 0;
const modProcess = progpGetModule("nodejsModProcess");
exports.cwd = modProcess.cwd;
exports.chdir = modProcess.chdir;
exports.getuid = modProcess.getuid;
exports.nextTick = modProcess.nextTick;
exports.kill = modProcess.kill;
exports.env = (() => {
    let res = {};
    let raw = JSON.parse(modProcess.env());
    for (let e of raw) {
        let idx = e.indexOf("=");
        res[e.substring(0, idx)] = e.substring(idx + 1);
    }
    return res;
})();
function exit(code) {
    if (!code)
        code = 0;
    modProcess.exit(code);
}
exports.exit = exit;
exports.argv = modProcess.argv();
exports.argv0 = exports.argv[0];
exports.execPath = exports.argv0;
exports.arch = modProcess.arch();
exports.platform = modProcess.platform();
exports.pid = modProcess.pid();
exports.ppid = modProcess.ppid();
exports.execArgv = [];
exports.default = {
    cwd: exports.cwd,
    exit: exit,
    chdir: exports.chdir,
    getuid: exports.getuid,
    nextTick: exports.nextTick,
    kill: exports.kill,
    env: exports.env,
    arch: exports.arch,
    platform: exports.platform,
    argv: exports.argv,
    argv0: exports.argv0,
    execArgv: exports.execArgv,
    execPath: exports.execPath,
    pid: exports.pid,
    ppid: exports.ppid,
};
