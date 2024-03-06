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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relative = exports.isAbsolute = exports.resolve = exports.toNamespacedPath = exports.parse = exports.format = exports.join = exports.extname = exports.dirname = exports.delimiter = exports.basename = void 0;
// https://nodejs.org/api/path.html
const node_process_1 = __importDefault(require("node:process"));
const sep = "/";
function basename(path, suffix) {
    if (!path)
        return "";
    let idx = path.lastIndexOf('/');
    if (idx != -1)
        path = path.substring(idx + 1);
    if (suffix !== undefined) {
        if (path.endsWith(suffix)) {
            return path.substring(0, path.length - suffix.length);
        }
    }
    return path;
}
exports.basename = basename;
// https://nodejs.org/api/path.html#pathdelimiter
exports.delimiter = ":";
// https://nodejs.org/api/path.html#pathdirnamepath
function dirname(path) {
    if (!path)
        return ".";
    if (path[path.length - 1] == "/") {
        path = path.substring(0, path.length - 1);
        if (!path)
            return "/";
    }
    let idx = path.lastIndexOf('/');
    if (idx == -1)
        return ".";
    return path.substring(0, idx);
}
exports.dirname = dirname;
// https://nodejs.org/api/path.html#pathextnamepath
function extname(path) {
    if (!path)
        return "";
    let idx = path.lastIndexOf('.');
    if (idx == -1)
        return "";
    if (idx == 0)
        return "";
    return path.substring(idx);
}
exports.extname = extname;
// https://nodejs.org/api/path.html#pathjoinpaths
//
function join(...paths) {
    if (!paths)
        return ".";
    let size = paths.length;
    if (!size)
        return ".";
    let res = paths[0];
    let i = 1;
    if (res == "") {
        do {
            res = paths[i++];
        } while ((res == "") && (i < size));
    }
    if (!res)
        return ".";
    let endsWithSep = res[res.length - 1] == "/";
    for (; i < size; i++) {
        let p = paths[i];
        if (p == "")
            continue;
        if (endsWithSep) {
            if (p[0] == "/")
                res += p.substring(1);
            else
                res += p;
        }
        else {
            if (p[0] == "/")
                res += p;
            else
                res += "/" + p;
        }
        endsWithSep = p[p.length - 1] == "/";
    }
    // Cas: "//a" --> "/a".
    do {
        if (res.length <= 1)
            return res;
        if (res[0] == "/") {
            if (res[1] == "/") {
                res = res.substring(1);
            }
            else {
                break;
            }
        }
        else {
            break;
        }
    } while (true);
    // Cas: "a//" --> "a/".
    //
    if (endsWithSep) {
        i = res.length - 2;
        while (res[i] == "/") {
            res = res.substring(0, i + 1);
            i--;
        }
    }
    if (!res)
        return ".";
    return res;
}
exports.join = join;
// https://nodejs.org/api/path.html#pathformatpathobject
//
function format(pathObject) {
    let p = "";
    if (pathObject.base) {
        p += pathObject.base;
    }
    else {
        if (pathObject.name)
            p += pathObject.name;
        if (pathObject.ext) {
            if (pathObject.ext[0] != ".")
                p += ".";
            p += pathObject.ext;
        }
    }
    if (pathObject.dir) {
        p = join(pathObject.dir, p);
    }
    else if (pathObject.root) {
        // root is for windows, it's for exemple "c:\" or "d:\".
        // Here windows isn't supported but the behaviors is.
        //
        p = join(pathObject.root, p);
    }
    return p;
}
exports.format = format;
// https://nodejs.org/api/path.html#pathparsepath
function parse(path) {
    let res = {
        root: "", base: "", dir: "", ext: "", name: ""
    };
    if (!path)
        return res;
    let idx = path.lastIndexOf("/");
    if (idx === -1) {
        res.dir = "";
        res.base = path;
    }
    else {
        if (idx === 0)
            res.dir = "/";
        else
            res.dir = path.substring(0, idx);
        res.base = path.substring(idx + 1);
    }
    idx = res.base.lastIndexOf(".");
    if (idx !== -1) {
        res.name = res.base.substring(0, idx);
        res.ext = res.base.substring(idx);
    }
    if (res.dir) {
        idx = res.dir.indexOf("/");
        res.root = res.dir.substring(0, idx + 1);
    }
    return res;
}
exports.parse = parse;
// https://nodejs.org/api/path.html#pathtonamespacedpathpath
function toNamespacedPath(path) {
    // Is only relevant on windows.
    // With posix system returns the path as is.
    return path;
}
exports.toNamespacedPath = toNamespacedPath;
// https://nodejs.org/api/path.html#pathresolvepaths
function resolve(...paths) {
    let segments = [];
    let isRel = true;
    let isFirst = true;
    let isAbs = false;
    for (let p of paths) {
        if (!p)
            continue;
        if (p[0] == '/') {
            segments = [];
            isRel = false;
            isFirst = true;
        }
        let parts = p.split("/");
        for (let part of parts) {
            if (!part) {
                if (isFirst)
                    isAbs = true;
                continue;
            }
            isFirst = false;
            if (part == ".") {
                continue;
            }
            if (part == "..") {
                if (segments.length !== 0) {
                    segments.pop();
                }
                continue;
            }
            segments.push(part);
        }
    }
    let res = segments.join("/");
    if (isRel)
        res = join(node_process_1.default.cwd(), res);
    else if (isAbs && (res[0] != "/"))
        res = "/" + res;
    return res;
}
exports.resolve = resolve;
// https://nodejs.org/api/path.html#pathisabsolutepath
function isAbsolute(path) {
    if (!path)
        return false;
    return path[0] == "/";
}
exports.isAbsolute = isAbsolute;
// https://nodejs.org/api/path.html#pathrelativefrom-to
function relative(pathFrom, pathTo) {
    if (!pathFrom)
        return pathTo;
    if (!pathTo)
        return node_process_1.default.cwd().substring(1);
    if (pathFrom == pathTo)
        return "";
    pathFrom = resolve(pathFrom);
    pathTo = resolve(pathTo);
    let sFrom = pathFrom.split("/");
    if (pathFrom == "/")
        sFrom.pop();
    let sTo = pathTo.split("/");
    //console.log("pathFrom=", pathFrom)
    //console.log("pathTo=", pathTo)
    // > Search common root
    let idxRoot = 0, max = sFrom.length;
    if (sTo.length < max)
        max = sTo.length;
    for (; idxRoot < max; idxRoot++) {
        if (sFrom[idxRoot] != sTo[idxRoot])
            break;
    }
    // > Add the "..", going from pathFrom to root
    let count;
    let moving = [];
    count = sFrom.length - idxRoot;
    for (let i = 0; i < count; i++)
        moving.push("..");
    // > Add the remaining parts of pathTo
    count = sTo.length;
    for (let i = idxRoot; i < count; i++) {
        moving.push(sTo[i]);
    }
    return moving.join("/");
}
exports.relative = relative;
exports.default = {
    sep: sep,
    delimiter: exports.delimiter,
    basename: basename,
    extname: extname,
    join: join,
    dirname: dirname,
    format: format,
    parse: parse,
    toNamespacedPath: toNamespacedPath,
    resolve: resolve,
    isAbsolute: isAbsolute,
    relative: relative,
};
