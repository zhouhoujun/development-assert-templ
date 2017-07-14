import { ITaskInfo, ITaskContext, IAssertDist, Pipe, task, PipeTask, Operation, IAsserts } from 'development-core';
import { Gulp } from 'gulp';
import * as _ from 'lodash';
// import * as chalk from 'chalk';
import * as path from 'path';
const cache = require('gulp-cached');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const htmlMin = require('gulp-minify-html');
const ngHtml2Js = require('gulp-ng-html2js');
const ngAnnotate = require('gulp-ng-annotate');

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


@task({
    oper: Operation.default | Operation.autoWatch
})
export class NgTemplateCompile extends PipeTask {
    constructor(info: ITaskInfo) {
        super(info)
    }

    getInfo() {
        this.info.name = this.info.name || 'ngTemlCompile';
        return this.info;
    }


    pipes(ctx: ITaskContext, dist: IAssertDist, gulp?: Gulp): Pipe[] {
        let option = ctx.option as ITemplTaskOption;
        let pipes: Pipe[] = [
            () => cache('templ'),
            () => plumber(),
            () => htmlMin({
                empty: true,
                spare: true,
                quotes: true
            }),
            (ctx) => ngHtml2Js({
                template: (<ITemplTaskOption>ctx.option).template || (<ITemplTaskOption>ctx.option).ngVersion === 2 ?
                    `
import angular from 'angular';
export default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('<%= template.url %>',  '<%= template.prettyEscapedContent %>');
}]);
`
                    : `
import angular from 'angular';
export default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('<%= template.url %>',  '<%= template.prettyEscapedContent %>');
}]);
`
            }),
            (ctx) => babel((<ITemplTaskOption>ctx.option).babelOption || { presets: ['es2015'] }),
            (ctx) => ngAnnotate((<ITemplTaskOption>ctx.option).ngAnnotate || { sourceMap: true, gulpWarnings: false })
        ];

        if (option.sourceMaps === true) {
            pipes.push(() => sourcemaps.init())
        }

        pipes = pipes.concat(super.pipes(ctx, dist, gulp));

        if (option.uglify) {
            pipes.push((ctx) => _.isBoolean(option.uglify) ? uglify() : uglify(option.uglify))

        }


        if (option.sourceMaps === true) {
            let mappath = (_.isBoolean(option.sourceMaps) || !option.sourceMaps) ? './sourcemaps' : option.sourceMaps;
            pipes.push((ctx) => sourcemaps.write(mappath));
        }
        return pipes;
    }

}

