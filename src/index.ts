import { IDynamicTaskOption, IPipe, IAsserts, Operation, IDynamicTasks, dynamicTask } from 'development-core';
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

@dynamicTask
export class TemplTasks implements IDynamicTasks {

    tasks(): IDynamicTaskOption[] {
        return [
            {
                name: 'templ',
                oper: Operation.default,
                pipes: [
                    () => cache('templ'),
                    () => plumber(),
                    () => htmlMin({
                        empty: true,
                        spare: true,
                        quotes: true
                    }),
                    (ctx) => ngHtml2Js({
                        template: (<ITemplTaskOption>ctx.option).template ||
                        `
import angular from 'angular';
export default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('<%= template.url %>',  '<%= template.prettyEscapedContent %>');
}]);
`
                    }),

                    <IPipe>{
                        oper: Operation.deploy | Operation.release,
                        toTransform: () => sourcemaps.init(),
                    },
                    <IPipe>{
                        oper: Operation.deploy | Operation.release,
                        toTransform: (ctx) => babel((<ITemplTaskOption>ctx.option).babelOption || { presets: ['es2015'] })
                    },
                    <IPipe>{
                        oper: Operation.deploy | Operation.release,
                        toTransform: (ctx) => ngAnnotate((<ITemplTaskOption>ctx.option).ngAnnotate || { sourceMap: true, gulpWarnings: false })
                    },
                    <IPipe>{
                        oper: Operation.deploy | Operation.release,
                        toTransform: () => uglify()
                    },
                    <IPipe>{
                        oper: Operation.deploy | Operation.release,
                        toTransform: (ctx) => sourcemaps.write((<ITemplTaskOption>ctx.option).sourceMaps ||  './sourcemaps')
                    }
                ]
            },
            {
                name: 'templwatch',
                oper: Operation.build,
                watchTasks: ['templ']
            }
        ];
    }
}
