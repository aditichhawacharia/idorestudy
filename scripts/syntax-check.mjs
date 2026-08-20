import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const roots = ['src', 'scripts'];
const files = [];
for (const root of roots) {
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(jsx?|mjs)$/.test(entry.name)) files.push(full);
    }
  };
  walk(root);
}

let errors = 0;
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const result = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: {
      allowJs: true,
      checkJs: false,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      isolatedModules: true,
    },
  });
  for (const diagnostic of result.diagnostics || []) {
    if (diagnostic.category !== ts.DiagnosticCategory.Error) continue;
    errors += 1;
    const location = diagnostic.file && diagnostic.start != null
      ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
      : null;
    const where = location ? `:${location.line + 1}:${location.character + 1}` : '';
    console.error(`${file}${where} ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
  }
}

if (errors) {
  console.error(`Syntax check failed with ${errors} error(s).`);
  process.exit(1);
}
console.log(`Syntax check passed for ${files.length} JavaScript/JSX files.`);
