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
//region Web Standard libraries
//region Timers
let g_nextTimerId = 1;
let g_timers = [];
// @ts-ignore
globalThis.setTimeout = function (callbackFct, timeInMs, ...params) {
    if (!callbackFct)
        return -1;
    const timerId = g_nextTimerId++;
    g_timers[timerId] = true;
    progpCallAfterMs(timeInMs, () => {
        let timerState = g_timers[timerId];
        if (timerState) {
            delete (g_timers[timerId]);
            callbackFct.call(globalThis, params);
        }
    });
    return timerId;
};
function setIntervalAux(callbackFct, timeInMs, params, timerId) {
    progpCallAfterMs(timeInMs, () => {
        let timerState = g_timers[timerId];
        if (timerState) {
            callbackFct.call(globalThis, params);
            setIntervalAux(callbackFct, timeInMs, params, timerId);
        }
    });
}
// @ts-ignore
globalThis.setInterval = function (callbackFct, timeInMs, ...params) {
    if (!callbackFct)
        return -1;
    const timerId = g_nextTimerId++;
    g_timers[timerId] = true;
    setIntervalAux(callbackFct, timeInMs, params, timerId);
    return timerId;
};
// @ts-ignore
globalThis.clearTimeout = function (timerId) {
    delete (g_timers[timerId]);
};
globalThis.clearInterval = globalThis.clearTimeout;
//endregion
//region Console
const bckConsoleLog = globalThis.console.log;
const bckConsoleWarn = globalThis.console.warn;
const bckConsoleError = globalThis.console.error;
const bckConsoleDebug = globalThis.console.debug;
const bckConsoleInfo = globalThis.console.info;
globalThis.console.log = function (...data) {
    progpPrint(...data);
    if (bckConsoleLog)
        bckConsoleLog(...data);
};
globalThis.console.warn = function (...data) {
    progpPrint("[WARN] ", ...data);
    if (bckConsoleWarn)
        bckConsoleWarn(...data);
};
globalThis.console.error = function (...data) {
    progpPrint("[ERROR] ", ...data);
    if (bckConsoleError)
        bckConsoleError(...data);
};
globalThis.console.debug = function (...data) {
    progpPrint("[DEBUG] ", ...data);
    if (bckConsoleDebug)
        bckConsoleDebug(...data);
};
globalThis.console.info = function (...data) {
    progpPrint("[INFO] ", ...data);
    if (bckConsoleInfo)
        bckConsoleInfo(...data);
};
