export declare function basename(path: any, suffix?: string): string;
export declare const delimiter = ":";
export declare function dirname(path: string): string;
export declare function extname(path: string): string;
export declare function join(...paths: string[]): string;
interface PathObject {
    dir?: string;
    root?: string;
    base?: string;
    name?: string;
    ext?: string;
}
export declare function format(pathObject: PathObject): string;
export declare function parse(path: string): PathObject;
export declare function toNamespacedPath(path: string): string;
export declare function resolve(...paths: string[]): string;
export declare function isAbsolute(path: string): boolean;
export declare function relative(pathFrom: string, pathTo: string): string;
declare const _default: {
    sep: string;
    delimiter: string;
    basename: typeof basename;
    extname: typeof extname;
    join: typeof join;
    dirname: typeof dirname;
    format: typeof format;
    parse: typeof parse;
    toNamespacedPath: typeof toNamespacedPath;
    resolve: typeof resolve;
    isAbsolute: typeof isAbsolute;
    relative: typeof relative;
};
export default _default;
