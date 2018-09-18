rm src/index.ts
for N in {1..100}; do
  echo "export function irrelevantCode${N}(): number { return ${N}; }" > "src/source${N}.ts";
  echo "export * from './source${N}';" >> src/index.ts;
done
