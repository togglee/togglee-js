import { terser } from "rollup-plugin-terser"
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import json from "rollup-plugin-json"
import builtins from "rollup-plugin-node-builtins"
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
    output: {
        format: "umd",
        file: "cdn/togglee-" + require("./package.json").version + ".min.js",
        name: "togglee"
    },
    input: "lib/index.ts",
    plugins: [
        nodeResolve({ jsnext: true, preferBuiltins: true, browser: true }), 
        commonjs(), 
        builtins(),
        typescript({
            rollupCommonJSResolveHack: true,
            tsconfigOverride: { compilerOptions: { module: "ESNext" } }
        }),
        terser(),
        json()    
    ]
}