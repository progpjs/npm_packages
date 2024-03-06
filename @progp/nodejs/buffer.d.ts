declare class Buffer extends Uint8Array {
    write(value: any, offset?: number, length?: number, _?: any): number;
    toJSON(): BufferAsJson;
    slice(): Buffer;
}
export declare function alloc(size: number, fill?: any): Buffer;
export declare function allocUnsafe(size: number): Buffer;
export declare function byteLength(buffer: Buffer): number;
export declare function from(value: any, offset?: number, length?: number): Buffer;
export declare function concat(arr: Buffer[], totalLength?: number): Buffer;
interface BufferAsJson {
    type: "Buffer";
    data: number[];
}
declare const _default: {
    alloc: typeof alloc;
    byteLength: typeof byteLength;
    from: typeof from;
    concat: typeof concat;
};
export default _default;
