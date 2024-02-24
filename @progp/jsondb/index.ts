import {SharedResource} from "@progp/core"

interface ModJsonDb {
    loadCollection(dbName: string, collName: string): void;
    addNormalizationHandler(dbName: string, collName: string, handler: NormalizationHandlerF):void
    getJson(res: SharedResource):string;
    initializeEngine():void;
    submitDocument(jsonDoc: string):void;
}

const modJsonDb = progpGetModule<ModJsonDb>("progpJsonDb")!;
type NormalizationHandlerF = (res: SharedResource) => void;

export const getJson = modJsonDb.getJson;
export const loadCollection = modJsonDb.loadCollection;
export const initializeEngine = modJsonDb.initializeEngine;
export const addNormalizationHandler = modJsonDb.addNormalizationHandler;

export function submitDocument(doc: JsonDocument) {
    modJsonDb.submitDocument(JSON.stringify(doc));
}

export interface JsonDocument {
    db: string
    coll: string

    id?: number
    doc: any

    addRelations?: any
    removeRelations?: any
}

export default {}