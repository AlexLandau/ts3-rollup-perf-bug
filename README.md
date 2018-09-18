# ts3-rollup-perf-bug
Public repro of a perf bug with TypeScript 3.0 and Rollup

To reproduce:
1) Install node and yarn if necessary.
2) Run `yarn`
3) Run `yarn build:rollup` and observe that it is slower than it should be (about 26 seconds on my machine).

You can also run `yarn build:tsc` and observe the faster tsc build (about 2-3 seconds).

Changing the typescript version to 2.9.2 makes the rollup build faster (about 9 seconds).

Some profiling and debugging indicates that typescript is not reusing old "programs" due to some logic around file redirectInfo (a concept added [in this PR](https://github.com/Microsoft/TypeScript/pull/16274) which did not have this behavior in 2.9.2). This is slow in this case because it is then generating a new program at least once per source file in the project. You can edit the `tryReuseStructureFromOldProgram` implementation in `node_modules/typescript/lib/typescript.js` to add some useful debugging info, particularly the section in the `if (oldSourceFile.redirectInfo) {` block, where the function reports that the old program cannot be reused.

(Note: The files in `src` were generated from the `generateSources.sh` script, which can be edited and rerun to easily change the number of source files.)
