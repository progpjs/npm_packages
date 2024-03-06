"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitDocument = exports.addNormalizationHandler = exports.initializeEngine = exports.loadCollection = exports.getJson = void 0;
const modJsonDb = progpGetModule("progpJsonDb");
exports.getJson = modJsonDb.getJson;
exports.loadCollection = modJsonDb.loadCollection;
exports.initializeEngine = modJsonDb.initializeEngine;
exports.addNormalizationHandler = modJsonDb.addNormalizationHandler;
function submitDocument(doc) {
    modJsonDb.submitDocument(JSON.stringify(doc));
}
exports.submitDocument = submitDocument;
exports.default = {};
