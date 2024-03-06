export declare const getJson: any;
export declare const loadCollection: any;
export declare const initializeEngine: any;
export declare const addNormalizationHandler: any;
export declare function submitDocument(doc: JsonDocument): void;
export interface JsonDocument {
    db: string;
    coll: string;
    id?: number;
    doc: any;
    addRelations?: any;
    removeRelations?: any;
}
declare const _default: {};
export default _default;
