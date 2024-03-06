declare function test(testName: string, testFunction: Function): void;
interface ErrorInfos {
    title: string;
    userMessage?: string | Error;
    hidedExpectedValue?: boolean;
    expectValue?: any;
    foundValue?: any;
}
declare function error(infos: ErrorInfos): void;
declare const Assert: {
    _errorCount: number;
    strictEqual: (actual: any, expected: any, message?: string | Error) => void;
    equal: (actual: any, expected: any, message?: string | Error) => void;
    throws: (f: Function, message?: string | Error) => void;
};
