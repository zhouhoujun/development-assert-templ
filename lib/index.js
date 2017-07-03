"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var development_core_1 = require("development-core");
var cache = require('gulp-cached');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var htmlMin = require('gulp-minify-html');
var ngHtml2Js = require('gulp-ng-html2js');
var ngAnnotate = require('gulp-ng-annotate');
var TemplTasks = (function () {
    function TemplTasks() {
    }
    TemplTasks.prototype.tasks = function () {
        return [
            {
                name: 'templ',
                oper: development_core_1.Operation.default,
                pipes: [
                    function () { return cache('templ'); },
                    function () { return plumber(); },
                    function () { return htmlMin({
                        empty: true,
                        spare: true,
                        quotes: true
                    }); },
                    function (ctx) { return ngHtml2Js({
                        template: ctx.option.template || ctx.option.ngVersion === 2 ?
                            "\nimport angular from 'angular';\nexport default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {\n    $templateCache.put('<%= template.url %>',  '<%= template.prettyEscapedContent %>');\n}]);\n"
                            : "\nimport angular from 'angular';\nexport default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {\n    $templateCache.put('<%= template.url %>',  '<%= template.prettyEscapedContent %>');\n}]);\n"
                    }); },
                    {
                        oper: development_core_1.Operation.deploy | development_core_1.Operation.release,
                        toTransform: function () { return sourcemaps.init(); },
                    },
                    {
                        oper: development_core_1.Operation.deploy | development_core_1.Operation.release,
                        toTransform: function (ctx) { return babel(ctx.option.babelOption || { presets: ['es2015'] }); }
                    },
                    {
                        oper: development_core_1.Operation.deploy | development_core_1.Operation.release,
                        toTransform: function (ctx) { return ngAnnotate(ctx.option.ngAnnotate || { sourceMap: true, gulpWarnings: false }); }
                    },
                    {
                        oper: development_core_1.Operation.deploy | development_core_1.Operation.release,
                        toTransform: function () { return uglify(); }
                    },
                    {
                        oper: development_core_1.Operation.deploy | development_core_1.Operation.release,
                        toTransform: function (ctx) { return sourcemaps.write(ctx.option.sourceMaps || './sourcemaps'); }
                    }
                ]
            },
            {
                name: 'templwatch',
                oper: development_core_1.Operation.build,
                watchTasks: ['templ']
            }
        ];
    };
    TemplTasks = __decorate([
        development_core_1.dynamicTask
    ], TemplTasks);
    return TemplTasks;
}());
exports.TemplTasks = TemplTasks;

//# sourceMappingURL=sourcemaps/index.js.map
