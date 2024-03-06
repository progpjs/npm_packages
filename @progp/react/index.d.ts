declare function gFragment(): void;
interface ReactNode {
    tag: string | Function;
    attributes: {
        [key: string]: any;
    } | null;
    children: any[];
    toString: () => string;
}
export declare const React: {
    Fragment: typeof gFragment;
    createElement(tag: any, attributes: {
        [key: string]: any;
    }, ...children: any[]): ReactNode;
};
/**
 * useEffect only execute in the browser.
 * It's why here the function does nothing.
 * It's here for compatibility only.
 *
 * See: https://legacy.reactjs.org/docs/hooks-effect.html
 */
export declare function useEffect(_: any): void;
/**
 * Server side, the value si the value always sends to useSate
 * and the updated is never taken in an account.
 *
 * https://legacy.reactjs.org/docs/hooks-reference.html#usestate
 */
export declare function useState(v: any): any;
/**
 * https://react.dev/reference/react/useContext
 */
export declare function createContext(defaultValue: any): any;
/**
 * https://react.dev/reference/react/useContext
 */
export declare function useContext(ctx: any): any;
export default React;
