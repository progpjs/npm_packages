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
exports.useContext = exports.createContext = exports.useState = exports.useEffect = exports.React = void 0;
// This package automatically replaces the official "react" package when imported
// thanks to a feature of esbuild named "alias".
function gFragment() { }
exports.React = {
    Fragment: gFragment,
    createElement(tag, attributes, ...children) {
        // Using a tree structure is required du to UseContext.
        //
        // When doing:
        //      <ThemeContext.Provider value="white">
        //          <ComponentUsingThemeContext />
        //      </ThemeContext.Provider>
        //
        // then the provider must be evalued before  ComponentUsingThemeContext.
        // But without a tree, ComponentUsingThemeContext is executed before.
        let r = {
            tag: tag,
            attributes: attributes,
            children: children
        };
        r.toString = RenderReactNode.bind(r);
        return r;
    }
};
function RenderReactNode() {
    // @ts-ignore
    let node = this;
    let tag = node.tag, attributes = node.attributes;
    let isFragment = tag === gFragment;
    if (!isFragment && (tag instanceof Function)) {
        if (node.children.length == 0) {
            let r = tag(node.attributes || {});
            if (!r)
                return "";
            return r.toString();
        }
        if (!attributes)
            attributes = {};
        attributes.children = node.children || [];
        let r = tag(attributes);
        if (!r)
            return "";
        return r.toString();
    }
    let out = isFragment ? "" : "<" + tag;
    if (!isFragment && attributes) {
        for (let [k, v] of Object.entries(attributes)) {
            if ((v === undefined) || (v === null))
                continue;
            if (v instanceof Function) {
                v = v();
                if ((v === undefined) || (v === null))
                    continue;
            }
            v = (k == "style") ? transformStyle(v) : String(v);
            v = '"' + v.replaceAll('"', '\\"') + '"';
            out += " " + k + "=" + v;
        }
    }
    if (!node.children.length) {
        if (!isFragment)
            out += "/>";
        return out;
    }
    if (!isFragment)
        out += ">";
    for (let c of node.children) {
        if (!c)
            continue;
        // To known: if b is a ReactNode, then ReactNode.toString() is automatically call here.
        out += c;
    }
    if (!isFragment)
        out += "</" + tag + ">";
    return out;
}
//region Style transforming
const gStyleNameCache = {};
// https://legacy.reactjs.org/docs/dom-elements.html#style
//
function transformStyle(style) {
    let out = "";
    for (const [k, v] of Object.entries(style)) {
        let name = gStyleNameCache[k];
        if (!name)
            gStyleNameCache[k] = name = translateStyleName(k);
        out += name + ":" + v + ";";
    }
    return out;
}
function translateStyleName(n) {
    let type = 0, previousType = 3, out = "";
    for (let l of n) {
        if ((l >= 'a') && (l <= 'z'))
            type = 1;
        else if ((l >= 'A') && (l <= 'Z'))
            type = 2;
        else
            type = 3;
        if ((type == 2) && (previousType == 1))
            out += "-" + l;
        else
            out += l;
        previousType = type;
    }
    return out.toLowerCase();
}
//endregion
// noinspection JSUnusedGlobalSymbols
/**
 * useEffect only execute in the browser.
 * It's why here the function does nothing.
 * It's here for compatibility only.
 *
 * See: https://legacy.reactjs.org/docs/hooks-effect.html
 */
function useEffect(_) { }
exports.useEffect = useEffect;
function voidFunction() { }
// noinspection JSUnusedGlobalSymbols
/**
 * Server side, the value si the value always sends to useSate
 * and the updated is never taken in an account.
 *
 * https://legacy.reactjs.org/docs/hooks-reference.html#usestate
 */
function useState(v) {
    if (v instanceof Function)
        return [v(), voidFunction];
    return [v, voidFunction];
}
exports.useState = useState;
/**
 * https://react.dev/reference/react/useContext
 */
function createContext(defaultValue) {
    let ctxValue = defaultValue;
    let f = function () { return ctxValue; };
    f.Provider = function ({ value, children }) {
        ctxValue = value;
        if (children) {
            let r = { tag: gFragment, children };
            r.toString = RenderReactNode.bind(r);
            return r;
        }
        return undefined;
    };
    return f;
}
exports.createContext = createContext;
// noinspection JSUnusedGlobalSymbols
/**
 * https://react.dev/reference/react/useContext
 */
function useContext(ctx) {
    return ctx();
}
exports.useContext = useContext;
exports.default = exports.React;
