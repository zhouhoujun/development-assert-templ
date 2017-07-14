/// <reference types="gulp" />
import { ITaskInfo, ITaskContext, IAssertDist, Pipe, PipeTask, IAsserts } from 'development-core';
import { Gulp } from 'gulp';
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
     * uglify ng template js.
     *
     * @type { boolean }
     * @memberof ITemplTaskOption
     */
    uglify?: boolean;
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
     * sourceMaps path. default no source maps.
     *
     * @type {string | boolean}
     * @memberOf ITemplTaskOption
     */
    sourceMaps: string | boolean;
}
export declare class NgTemplateCompile extends PipeTask {
    constructor(info: ITaskInfo);
    getInfo(): ITaskInfo;
    pipes(ctx: ITaskContext, dist: IAssertDist, gulp?: Gulp): Pipe[];
}
