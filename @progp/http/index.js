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
exports.fetch = exports.brotliCompressFile = exports.BROTLI_COMPRESSION_LEVEL_DEFAULT_COMPRESSION = exports.BROTLI_COMPRESSION_LEVEL_BEST_COMPRESSION = exports.BROTLI_COMPRESSION_LEVEL_BEST_SPEED = exports.gzipCompressFile = exports.GZIP_COMPRESSION_LEVEL_HUFFMAN_ONLY = exports.GZIP_COMPRESSION_LEVEL_DEFAULT_COMPRESSION = exports.GZIP_COMPRESSION_LEVEL_BEST_COMPRESSION = exports.GZIP_COMPRESSION_LEVEL_BEST_SPEED = exports.GZIP_COMPRESSION_LEVEL_NO_COMPRESSION = exports.asHttpRequest = exports.FileServer = exports.HttpHost = exports.HttpServer = exports.HttpRequest = void 0;
const modHttp = progpGetModule("progpjsModHttp");
class HttpRequest {
    constructor(resId, caller) {
        this._contentType = "text/html";
        if (caller !== gSecureCaller)
            throw Error("Forbiden call");
        this.resId = resId;
    }
    returnString(httpCode, value) {
        modHttp.returnString(this.resId, httpCode, this._contentType, value);
    }
    returnHtml(httpCode, value) {
        modHttp.returnString(this.resId, httpCode, this._contentType, value);
    }
    sendFile(filePath) {
        modHttp.sendFile(this.resId, filePath);
    }
    sendFileAsIs(filePath, mimeType, contentEncoding) {
        if (mimeType === undefined)
            mimeType = "";
        if (contentEncoding === undefined)
            contentEncoding = "";
        modHttp.sendFileAsIs(this.resId, filePath, mimeType, contentEncoding);
    }
    setHeader(key, value) {
        modHttp.responseSetHeader(this.resId, key, value);
    }
    setContentType(value) {
        this._contentType = value;
    }
    deleteCookie(key) {
        this.setCookie(key, "", { maxAge: 0 });
    }
    setCookie(key, value, options) {
        modHttp.responseSetCookie(this.resId, key, value, options || {});
    }
    requestURI() {
        if (this._requestURI === undefined) {
            return this._requestURI = modHttp.requestURI(this.resId);
        }
        return this._requestURI;
    }
    requestPath() {
        if (this._requestPath === undefined) {
            return this._requestPath = modHttp.requestPath(this.resId);
        }
        return this._requestPath;
    }
    requestIP() {
        if (this._requestIP === undefined) {
            return this._requestIP = modHttp.requestIP(this.resId);
        }
        return this._requestIP;
    }
    requestMethod() {
        if (this._requestMethod === undefined) {
            return this._requestMethod = modHttp.requestMethod(this.resId);
        }
        return this._requestMethod;
    }
    requestHost() {
        if (this._requestHost === undefined) {
            return this._requestHost = modHttp.requestHost(this.resId);
        }
        return this._requestHost;
    }
    /**
     * PHP like style, allows making thing easyier.
     */
    _$GET(key) {
        if (this._requestQueryArgs === undefined) {
            return this._requestQueryArgs = modHttp.requestQueryArgs(this.resId);
        }
        if (!this._requestQueryArgs)
            return undefined;
        return this._requestQueryArgs[key];
    }
    requestQueryArgs() {
        if (this._requestQueryArgs === undefined) {
            return this._requestQueryArgs = modHttp.requestQueryArgs(this.resId);
        }
        return this._requestQueryArgs;
    }
    readFormFile(key, fileOffset) {
        return new Promise((resolve, reject) => {
            modHttp.requestReadFormFile(this.resId, key, fileOffset, (err, buffer) => {
                if (err)
                    reject(err);
                else
                    resolve(buffer);
            });
        });
    }
    saveFormFile(key, fileOffset, saveFilePath) {
        return new Promise((resolve, reject) => {
            modHttp.requestSaveFormFile(this.resId, key, fileOffset, saveFilePath, (err, ok) => {
                if (err)
                    reject(err);
                else
                    resolve(ok);
            });
        });
    }
    /**
     * PHP like style, allows making thing easyier.
     */
    _$POST(key) {
        if (this._requestPostArgs === undefined) {
            return this._requestPostArgs = modHttp.requestPostArgs(this.resId);
        }
        if (!this._requestPostArgs)
            return undefined;
        return this._requestPostArgs[key];
    }
    requestPostArgs() {
        if (this._requestPostArgs === undefined) {
            return this._requestPostArgs = modHttp.requestPostArgs(this.resId);
        }
        return this._requestPostArgs;
    }
    requestWildcards() {
        if (this._requestWildcards === undefined) {
            return this._requestWildcards = modHttp.requestWildcards(this.resId);
        }
        return this._requestWildcards;
    }
    requestCookies() {
        if (this._requestCookies === undefined) {
            let res = modHttp.requestCookies(this.resId);
            if (!res)
                res = {};
            return this._requestCookies = res;
        }
        return this._requestCookies;
    }
    requestCookie(name) {
        return this.requestCookies()[name];
    }
    requestHeaders() {
        if (this._requestHeaders === undefined) {
            return this._requestHeaders = modHttp.requestHeaders(this.resId);
        }
        return this._requestHeaders;
    }
}
exports.HttpRequest = HttpRequest;
class HttpServer {
    constructor(serverPort) {
        this.isStarted = false;
        this.serverPort = serverPort;
    }
    configure(config) {
        this.config = config;
    }
    /**
     * Register a https certificate.
     *
     * To create your dev certificate:
     * 1- Install mkcert from https://github.com/FiloSottile/mkcert
     * 2- mkcert -install		--> to do one time, create the root CA certificate, which is required to create your own test certificate.
     * 3- mkcert myhostname     --> create a valid certificate (here you can replace myhostname by localhost).
     *
     * Automatic dev certificate isn't supported anymore since it introduce difficult behaviors.
     */
    addHttpsCertificate(hostName, certFilePath, keyFilePath) {
        if (!this.config) {
            this.config = {
                enableHttps: true,
                certificates: []
            };
        }
        this.config.certificates.push({
            hostName: hostName,
            certFilePath: certFilePath,
            keyFilePath: keyFilePath
        });
    }
    addLetEncryptCertificate(hostName, cacheDir) {
        if (!this.config) {
            this.config = {
                enableHttps: true,
                certificates: []
            };
        }
        this.config.certificates.push({
            hostName: hostName,
            useLetsEncrypt: true,
            cacheDir: cacheDir
        });
    }
    start() {
        if (this.isStarted)
            return;
        if (this.config && !modHttp.configureServer(this.serverPort, this.config)) {
            // configureServer returns false if the server is already started.
            this.isStarted = true;
            return;
        }
        modHttp.startServer(this.serverPort);
        this.isStarted = true;
    }
    getHost(hostName) {
        let hostResId = modHttp.getHost(this.serverPort, hostName);
        return new HttpHost(hostResId);
    }
}
exports.HttpServer = HttpServer;
class HttpHost {
    constructor(hostResId) {
        this.hostResId = hostResId;
    }
    verb(verb, requestPath, handler) {
        modHttp.VERB_withFunction(this.hostResId, verb, requestPath, (_, resId) => {
            handler(new HttpRequest(resId, gSecureCaller));
        });
    }
    GET(requestPath, handler) {
        this.verb("GET", requestPath, handler);
    }
    POST(requestPath, handler) {
        this.verb("POST", requestPath, handler);
    }
    proxyTo(fromPath, targetHost, options) {
        if (!fromPath)
            fromPath = "/";
        if (!options)
            options = {};
        modHttp.proxyTo(this.hostResId, fromPath, targetHost, options);
    }
    serveFiles(fromPath, dirPath, options) {
        if (!fromPath)
            fromPath = "/";
        if (!options)
            options = {};
        let res = modHttp.fileServer_Create(this.hostResId, fromPath, dirPath, options);
        return new FileServer(res);
    }
}
exports.HttpHost = HttpHost;
class FileServer {
    constructor(resId) {
        this.resId = resId;
    }
    removeAll() {
        modHttp.fileServer_RemoveAll(this.resId);
    }
    visitCache(onCacheEntry) {
        modHttp.fileServer_VisitCache(this.resId, (_, raw) => {
            onCacheEntry(JSON.parse(raw));
        });
    }
    onFileNotFound(f) {
        modHttp.fileServer_OnFileNotFound(this.resId, (resId, json) => {
            f(JSON.parse(json), () => progpReturnVoid(resId));
        });
    }
    /**
     * Remove the exact uri.
     * @param uri   The uri to remove.
     * @param data  Is used by hooks to finely select content to remove.
     */
    removeUri(uri, data) {
        if (data === undefined)
            data = "";
        modHttp.fileServer_RemoveUri(this.resId, uri, data);
    }
}
exports.FileServer = FileServer;
function asHttpRequest(f) {
    return (resId) => f(new HttpRequest(resId, gSecureCaller));
}
exports.asHttpRequest = asHttpRequest;
exports.GZIP_COMPRESSION_LEVEL_NO_COMPRESSION = 0;
exports.GZIP_COMPRESSION_LEVEL_BEST_SPEED = 1;
exports.GZIP_COMPRESSION_LEVEL_BEST_COMPRESSION = 9;
exports.GZIP_COMPRESSION_LEVEL_DEFAULT_COMPRESSION = -1;
exports.GZIP_COMPRESSION_LEVEL_HUFFMAN_ONLY = -2;
/**
 * Allows to compress a file with GZip in the same way as what http server do.
 * This allows to store a pre-compressed file in order to serve it as-is for full-speed.
 */
async function gzipCompressFile(sourceFilePath, targetFilePath, compressionLevel) {
    // Default is best compression level.
    if (!compressionLevel)
        compressionLevel = exports.GZIP_COMPRESSION_LEVEL_BEST_COMPRESSION;
    return new Promise(function (resolve, reject) {
        modHttp.gzipCompressFile(sourceFilePath, targetFilePath, compressionLevel, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
exports.gzipCompressFile = gzipCompressFile;
exports.BROTLI_COMPRESSION_LEVEL_BEST_SPEED = 0;
exports.BROTLI_COMPRESSION_LEVEL_BEST_COMPRESSION = 11;
exports.BROTLI_COMPRESSION_LEVEL_DEFAULT_COMPRESSION = 6;
/**
 * Allows to compress a file with Brotli in the same way as what http server do.
 * This allows to store a pre-compressed file in order to serve it as-is for full-speed.
 */
async function brotliCompressFile(sourceFilePath, targetFilePath, compressionLevel) {
    // Default is best compression level.
    if (!compressionLevel)
        compressionLevel = exports.BROTLI_COMPRESSION_LEVEL_BEST_COMPRESSION;
    return new Promise(function (resolve, reject) {
        modHttp.brotliCompressFile(sourceFilePath, targetFilePath, compressionLevel, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
exports.brotliCompressFile = brotliCompressFile;
async function fetch(url, options) {
    if (!options)
        options = {};
    if (!options.method)
        options.method = "GET";
    return new Promise(function (resolve, reject) {
        modHttp.fetch(url, options, (err, res) => {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(res));
        });
    });
}
exports.fetch = fetch;
let gSecureCaller = { v: {} };
