import { SharedResource } from "@progp/core";
interface CookieOptions {
    isHttpOnly?: boolean;
    isSecure?: boolean;
    sameSiteType?: number;
    domain?: string;
    expireTime?: number;
    maxAge?: number;
}
export interface HttpCookie {
    key: string;
    domain: string;
    value: string;
    maxAge: number;
    expireTime: number;
    sameSiteType: number;
    isSecure: boolean;
    isHTTPOnly: boolean;
}
export interface FormFileInfo {
    id: number;
    header: any;
    size: number;
}
export declare class HttpRequest {
    private readonly resId;
    private _requestURI;
    private _requestPath;
    private _requestIP;
    private _requestMethod;
    private _requestHost;
    private _requestQueryArgs;
    private _requestPostArgs;
    private _requestWildcards;
    private _requestHeaders;
    private _requestCookies;
    private _contentType;
    constructor(resId: SharedResource, caller: any);
    returnString(httpCode: number, value: string): void;
    returnHtml(httpCode: number, value: string): void;
    sendFile(filePath: string): void;
    sendFileAsIs(filePath: string, mimeType?: string, contentEncoding?: string): void;
    setHeader(key: string, value: string): void;
    setContentType(value: string): void;
    deleteCookie(key: string): void;
    setCookie(key: string, value: string, options?: CookieOptions): void;
    requestURI(): string;
    requestPath(): string;
    requestIP(): string;
    requestMethod(): string;
    requestHost(): string;
    /**
     * PHP like style, allows making thing easyier.
     */
    _$GET(key: string): any;
    requestQueryArgs(): {
        [key: string]: string;
    };
    readFormFile(key: string, fileOffset: number): Promise<ArrayBuffer | null>;
    saveFormFile(key: string, fileOffset: number, saveFilePath: string): Promise<boolean>;
    /**
     * PHP like style, allows making thing easyier.
     */
    _$POST(key: string): any;
    requestPostArgs(): {
        [key: string]: string | FormFileInfo[];
    };
    requestWildcards(): any;
    requestCookies(): {
        [key: string]: HttpCookie;
    };
    requestCookie(name: string): HttpCookie | null;
    requestHeaders(): any;
}
export interface HttCertificate {
    hostName: string;
    certFilePath?: string;
    keyFilePath?: string;
    useLetsEncrypt?: boolean;
    cacheDir?: string;
}
export interface HttpServerConfig {
    /**
     * Allows to hide server error and don't write message in the console.
     * It's important to hide error, without what attackers can slow down the server by a lot with fake calls.
     */
    hideErrors?: boolean;
    enableHttps?: boolean;
    certificates: HttCertificate[];
}
export interface FetchOptions {
    /**
     * Indicate the http method to use.
     * Default is GET.
     */
    method?: string;
    /**
     * If set, save the body inside a file.
     */
    streamBodyToFile?: string;
    /**
     * If true, returns the response headers.
     */
    returnHeaders?: boolean;
    /**
     * If true, returns the response cookies.
     */
    returnCookies?: boolean;
    /**
     * If set, set the list of the headers to send.
     */
    sendHeaders?: {
        [key: string]: string;
    };
    /**
     * If set, set the list of the cookies to send.
     */
    setCookies?: {
        [key: string]: string;
    };
    /**
     * Allows to return body event if response code isn't 200 Ok.
     */
    forceReturningBody?: boolean;
    /**
     * Allows to avoid requesting the body.
     * Is useful if testing target existence or when we want to only get his headers.
     */
    skipBody?: boolean;
    /**
     * Set the content type used when sending a body with the request.
     * Isn't set when no request are set.
     */
    contentType?: string;
    /**
     * UserAgent set the user agent used when sending a body with the request.
     * Isn't set when no request are set.
     */
    userAgent?: string;
}
export interface ProxyTypeOptions {
    /**
     * Allows to avoid including url from this path.
     */
    excludeSubPaths?: boolean;
}
export interface ServeFileOptions {
}
export declare class HttpServer {
    private readonly serverPort;
    private isStarted;
    private config;
    constructor(serverPort: number);
    configure(config: HttpServerConfig): void;
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
    addHttpsCertificate(hostName: string, certFilePath: string, keyFilePath: string): void;
    addLetEncryptCertificate(hostName: string, cacheDir: string): void;
    start(): void;
    getHost(hostName: string): HttpHost;
}
export declare class HttpHost {
    private readonly hostResId;
    constructor(hostResId: SharedResource);
    verb(verb: string, requestPath: string, handler: HttpRequestHandler): void;
    GET(requestPath: string, handler: HttpRequestHandler): void;
    POST(requestPath: string, handler: HttpRequestHandler): void;
    proxyTo(fromPath: string, targetHost: string, options?: ProxyTypeOptions): void;
    serveFiles(fromPath: string, dirPath: string, options?: ServeFileOptions): FileServer;
}
export interface FsCacheEntry {
    hitCount: number;
    filePath: string;
    gzipFilePath: string;
    uri: string;
    data: string;
    fileUpdateDate: number;
    lastRequestedData: number;
    contentType: string;
    contentLength: number;
    gzipContentLength: number;
}
export interface FsOnFileNodeFound {
    filePath: string;
    uri: string;
    uriPath: string;
    queryString: string;
    data: string;
    hostName: string;
}
export declare class FileServer {
    private readonly resId;
    constructor(resId: SharedResource);
    removeAll(): void;
    visitCache(onCacheEntry: ((v: FsCacheEntry) => void)): void;
    onFileNotFound(f: ((v: FsOnFileNodeFound, oneDone: Function) => void)): void;
    /**
     * Remove the exact uri.
     * @param uri   The uri to remove.
     * @param data  Is used by hooks to finely select content to remove.
     */
    removeUri(uri: string, data?: string): void;
}
export type HttpRequestHandler = (res: HttpRequest) => Promise<void>;
export declare function asHttpRequest(f: (req: HttpRequest) => void): (resId: SharedResource) => void;
export declare const GZIP_COMPRESSION_LEVEL_NO_COMPRESSION = 0;
export declare const GZIP_COMPRESSION_LEVEL_BEST_SPEED = 1;
export declare const GZIP_COMPRESSION_LEVEL_BEST_COMPRESSION = 9;
export declare const GZIP_COMPRESSION_LEVEL_DEFAULT_COMPRESSION = -1;
export declare const GZIP_COMPRESSION_LEVEL_HUFFMAN_ONLY = -2;
/**
 * Allows to compress a file with GZip in the same way as what http server do.
 * This allows to store a pre-compressed file in order to serve it as-is for full-speed.
 */
export declare function gzipCompressFile(sourceFilePath: string, targetFilePath: string, compressionLevel?: number): Promise<void>;
export declare const BROTLI_COMPRESSION_LEVEL_BEST_SPEED = 0;
export declare const BROTLI_COMPRESSION_LEVEL_BEST_COMPRESSION = 11;
export declare const BROTLI_COMPRESSION_LEVEL_DEFAULT_COMPRESSION = 6;
/**
 * Allows to compress a file with Brotli in the same way as what http server do.
 * This allows to store a pre-compressed file in order to serve it as-is for full-speed.
 */
export declare function brotliCompressFile(sourceFilePath: string, targetFilePath: string, compressionLevel?: number): Promise<void>;
export interface FetchResult {
    statusCode: number;
    body?: string;
    headers?: {
        [key: string]: string;
    };
    cookies?: {
        [key: string]: any;
    };
}
export declare function fetch(url: string, options?: FetchOptions): Promise<FetchResult>;
export {};
