import * as mocha from 'mocha';
import { expect, assert } from 'chai';

import { ITask, bindingConfig, runTaskSequence } from 'development-core';
import * as gulp from 'gulp';
import * as templtasks from '../src';
import * as fs from 'fs';
import * as path from 'path';

const del = require('del');
let root: string = __dirname;
// console.log(path.join('development-assert-templ/test/', 'dist/prod/testb.js'));
// console.log(path.resolve('development-assert-templ/test/', 'dist/prod/testb.js'));

describe('template tasks', () => {

    // beforeEach(async () => {
    //     await del(path.join(root, './dist'));
    // })

    it('compile build template', async () => {

        await del(path.join(root, 'dist/dev'));
        let cfg = bindingConfig({
            env: { root: root },
            option: { name: 'tb', src: 'app/dev/**/*.html', dist: 'dist/dev' }
        });
        // expect(fs.existsSync(path.resolve(root, './app/test.html'))).eq(true);

        let tasks: ITask[] = await cfg.findTasks(templtasks);

        expect(tasks).to.not.null;
        expect(tasks.length).eq(1);
        // expect(cfg.getSrc()).eq('./app/*.html');

        await runTaskSequence(gulp, tasks, cfg);
        expect(fs.existsSync(path.join(root, 'dist/dev/testa.js'))).eq(true);
        expect(fs.readFileSync(path.join(root, 'dist/dev/testa.js'), 'utf8').indexOf("import angular from 'angular';")).gt(0);

    });

    it('compile release template', async () => {
        await del(path.join(root, 'dist/prod'));
        let cfg = bindingConfig({
            env: { root: root, release: true },
            option: { name: 'tr', src: 'app/prod/*.html', dist: 'dist/prod' }
        });

        let tasks: ITask[] = await cfg.findTasks(templtasks);

        expect(tasks).to.not.null;
        expect(tasks.length).eq(1);
        // expect(cfg.getSrc()).eq('./app/*.html');

        await runTaskSequence(gulp, tasks, cfg);
        expect(fs.existsSync(path.join(root, 'dist/prod/testb.js'))).eq(true);
        expect(fs.readFileSync(path.join(root, 'dist/prod/testb.js'), 'utf8').indexOf("import angular from 'angular';")).lt(0);

    });
})
