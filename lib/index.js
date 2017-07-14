"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var development_core_1 = require("development-core");
var _ = require("lodash");
var cache = require('gulp-cached');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var htmlMin = require('gulp-minify-html');
var ngHtml2Js = require('gulp-ng-html2js');
var ngAnnotate = require('gulp-ng-annotate');
var NgTemplateCompile = (function (_super) {
    __extends(NgTemplateCompile, _super);
    function NgTemplateCompile(info) {
        return _super.call(this, info) || this;
    }
    NgTemplateCompile.prototype.getInfo = function () {
        this.info.name = this.info.name || 'ngTemlCompile';
        return this.info;
    };
    NgTemplateCompile.prototype.pipes = function (ctx, dist, gulp) {
        var option = ctx.option;
        var pipes = [
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
            function (ctx) { return babel(ctx.option.babelOption || { presets: ['es2015'] }); },
            function (ctx) { return ngAnnotate(ctx.option.ngAnnotate || { sourceMap: true, gulpWarnings: false }); }
        ];
        if (option.sourceMaps === true) {
            pipes.push(function () { return sourcemaps.init(); });
        }
        pipes = pipes.concat(_super.prototype.pipes.call(this, ctx, dist, gulp));
        if (option.uglify) {
            pipes.push(function (ctx) { return _.isBoolean(option.uglify) ? uglify() : uglify(option.uglify); });
        }
        if (option.sourceMaps === true) {
            var mappath_1 = (_.isBoolean(option.sourceMaps) || !option.sourceMaps) ? './sourcemaps' : option.sourceMaps;
            pipes.push(function (ctx) { return sourcemaps.write(mappath_1); });
        }
        return pipes;
    };
    NgTemplateCompile = __decorate([
        development_core_1.task({
            oper: development_core_1.Operation.default | development_core_1.Operation.autoWatch
        }),
        __metadata("design:paramtypes", [Object])
    ], NgTemplateCompile);
    return NgTemplateCompile;
}(development_core_1.PipeTask));
exports.NgTemplateCompile = NgTemplateCompile;

//# sourceMappingURL=sourcemaps/index.js.map
