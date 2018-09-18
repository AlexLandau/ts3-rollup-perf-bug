import typescript from "rollup-plugin-typescript2";
import * as rollup from "rollup";

// Valid values for format: `main`, `module`, `esnext`
function standardConfigFor({ exportType }) {
  if (exportType !== 'main' && exportType !== 'module' && exportType !== "esnext") {
    throw new Error(`Invalid format ${format}`)
  }

  const target = exportType === "esnext" ? "es6" : "es5";
  const module = exportType === "main" ? "CommonJS" : "es6";
  const format = exportType === "main" ? "cjs" : "es";

  return {
    input: "src/index.ts",
    output: {
      file: `outRollup/index.rollup.${exportType}.js`,
      format,
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
        tsconfigOverride: {
          compilerOptions: {
            target,
            module,
            declarationDir: "outRollup"
          }
        }
      }),
    ],
  };
}

function standardConfigs() {
  return [
    standardConfigFor({ exportType: "main" }), 
    standardConfigFor({ exportType: "module" }), 
    standardConfigFor({ exportType: "esnext" })
  ];
}

export default standardConfigs();

