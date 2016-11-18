import { IDynamicTaskOption, IAsserts, IDynamicTasks } from 'development-core';
/**
 * templ assert task option.
 *
 * @export
 * @interface ITemplTaskOption
 * @extends {IAsserts}
 */
export interface ITemplTaskOption extends IAsserts {
    /**
     * js template for html.
     *
     * @type {sring}
     * @memberOf ITemplTaskOption
     */
    template: string;
    /**
     * babel 6 option.
     *
     * @type {*}
     * @memberOf ITemplTaskOption
     */
    babelOption: any;
    /**
     * ngAnnotate option.
     *
     * @type {*}
     * @memberOf ITemplTaskOption
     */
    ngAnnotate: any;
    /**
     * sourceMaps path.
     *
     * @type {string}
     * @memberOf ITemplTaskOption
     */
    sourceMaps: string;
}
export declare class TemplTasks implements IDynamicTasks {
    tasks(): IDynamicTaskOption[];
}
