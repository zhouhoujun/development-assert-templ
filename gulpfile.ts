import * as gulp from 'gulp';
// import 'development-core';
import { Development } from 'development-tool';
// import 'development-tool-node';

Development.create(gulp, __dirname, [
    {
        src: 'src',
        dist: 'lib',
        buildDist: 'build',
        testSrc: 'test/**/*.spec.ts',
        loader: 'development-tool-node'
    }
]);
