# packaged development-assert-templ

This repo is for distribution on `npm`. The source for this module is in the
[main repo](https://github.com/zhouhoujun/development-assert-templ/src/mastert).
Please file issues and pull requests against that repo.

This package is template assert (html) tasks for development tools.

## Install

You can install this package either with `npm`.

### npm

```shell

npm install development-assert-templ

```

You can `import` modules:

## import module

```ts
import * as gulp from 'gulp';
import  { Development } from 'development-tool';
import { IWebTaskOption } from 'development-tool-web';

```

## Create development tool

```ts
Development.create(gulp, __dirname, {
    tasks:[
        <IWebTaskOption>{
            src: 'src',
            //testSrc: '...',
            //e2eSrc: '...',
            //watchSrc: '...'
            dist: 'dist/development',
            // buildDist:'build path',
            releaseDist: 'dist/production',
            // depolyDist: 'depoly path'
            asserts:{
                templ: {
                    src: 'src/**/*.tpl.html',
                    // testSrc: '...',
                    // e2eSrc: '...',
                    // watchSrc: '...'
                    // dist: 'dist path',
                    // buildDist:'build path',
                    // releaseDist: 'release path',
                    // depolyDist: 'depoly path'
                    loader: {
                        module:'development-assert-templ',
                        // add pipe works for module tasks.
                        pipe(stream, ctx, dist, gulp){ ... }
                        pipes: Pipe[] | (ctx, dist, gulp)=> Pipe[],
                        output: OutputPipe[] | (stream, ctx, dist, gulp)=> OutputPipe[]
                    }
                },
                templb: {
                    src: 'srcb/**/*.tpl.html',
                    // testSrc: '...',
                    // e2eSrc: '...',
                    // watchSrc: '...'
                    // dist: 'dist path',
                    // buildDist:'build path',
                    // releaseDist: 'release path',
                    // depolyDist: 'depoly path'
                    loader: 'development-assert-templ',
                    // also can add pipe works for module tasks here.
                    pipe(stream, ctx, dist, gulp){ ... }
                    pipes: Pipe[] | (ctx, dist, gulp)=> Pipe[],
                    output: OutputPipe[] | (stream, ctx, dist, gulp)=> OutputPipe[]
                },
                html: ['src/*.html', 'src/*.cshtml'],
                json: 'src/**/*.json',
                css:'src/common/**/*.css',
                moduleBcss: ['src/moduleB/**/*.css'],
                moduleAcss: {
                    src: ['src/apath/**/*.css', 'src/bpath/**/*.css'],
                    dist:'dist path',
                    buildDist:'buildDist path',
                    releaseDist: 'release Distpath',
                    depolyDist: 'depoly Distpath'
                },
                ...
            },
            loader: 'development-tool-web'
        }
    ]
});
```


https://github.com/zhouhoujun/development-assert-templ.git

## Documentation

Documentation is available on the
[development-assert-templ docs site](https://github.com/zhouhoujun/development-assert-templ).

## License

MIT © [Houjun](https://github.com/zhouhoujun/)