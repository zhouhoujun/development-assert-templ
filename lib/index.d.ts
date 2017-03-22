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
     * custom html template.
     *
     * @type {sring}
     * @memberOf ITemplTaskOption
     */
    template?: string;
    /**
     * default template for angular version. 1 or 2. default angular1 template
     *
     * @type {sring}
     * @memberOf ITemplTaskOption
     */
    ngVersion?: number;
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
