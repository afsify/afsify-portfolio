import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
const compiled = new Map();
export async function loadSource(file) {
  file = path.resolve(file);
  if (compiled.has(file)) return compiled.get(file);
  let source = ts.transpileModule(await fs.readFile(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  for (const match of [...source.matchAll(/from ["'](\.[^"']+)["']/g)]) {
    const dependency = path.resolve(path.dirname(file), `${match[1]}.ts`);
    source = source.replace(match[0], `from "${await loadSource(dependency)}"`);
  }
  const url = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  compiled.set(file, url);
  return url;
}
