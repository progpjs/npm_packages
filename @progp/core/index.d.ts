declare global {
    /**
     * Get a native function group (function in C++ or Go).
     * Return undefined if the security level is inferior to the security level of this group.
     */
    function progpGetModule<T>(modName: string): T | undefined;
    /**
     * Print his argument to the console.
     * Is like "console.log".
     */
    function progpPrint(...params: any): void;
    /**
     * Allows to avoid that a function is removed by the javascript optimizer.
     */
    function progpDontRemove(e: any): void;
    function progpCallAfterMs(timeInMs: number, callback: Function): void;
    function progpStringToBuffer(text: string): ArrayBuffer;
    function progpBufferToString(b: ArrayBuffer): string;
    /**
     * Execute a script in a new context.
     * This script can be typescript, or tsx, pr jsx.
     */
    function progpRunScript(scriptFilePath: string, securityGroup: string, callback: Function): void;
    /**
     * progpDispose will dispose the SharedResource.
     * It will call the dispose function bound to this resource
     * and dispose the resource wrapper.
     */
    function progpDispose(res: SharedResource): void;
    /**
     * progpAutoDispose will automatically dispose all the resources created
     * by the f function once this function is fully terminated, which include
     * all the asynchronous function call from this function.
     *
     * For example if you open a file, this file resource will be disposed
     * once this function ends, without having to manually call progpDispose(myFile).
     */
    function progpAutoDispose(f: Function): void;
    /**
     * Allow to return a string for a shared resource implementing interface progpAPI.ProgpReturnStringAction
     */
    function progpReturnString(res: SharedResource, value: string): void;
    /**
     * Allow to return a string for a shared resource implementing interface progpAPI.ProgpReturnVoidAction
     */
    function progpReturnVoid(res: SharedResource): void;
    /**
     * Allow to return a string for a shared resource implementing interface progpAPI.ProgpReturnErrorAction
     */
    function progpReturnError(res: SharedResource, error: string): void;
    /**
     * Allows to send a signal to all signal listeners.
     * @param signal    The signal name
     * @param data      A simple string or a json encoded string.
     */
    function progpSendSignal(signal: string, data: string): void;
}
/**
 * Allows to known when a SharedResource is required.
 * Here it's mainly a placeholder since the underlying type is a number.
 */
export interface SharedResource {
}
