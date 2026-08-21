import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const require = createRequire(import.meta.url);
let ts;
try {
  ts = require('typescript');
} catch {
  const globalRoot = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
  ts = require(path.join(globalRoot, 'typescript'));
}

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


function resolveRelativeImport(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [base, `${base}.js`, `${base}.jsx`, `${base}.mjs`, path.join(base, 'index.js'), path.join(base, 'index.jsx')];
  return candidates.find((candidate) => fs.existsSync(candidate));
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

  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.ES2022, true, file.endsWith('.jsx') ? ts.ScriptKind.JSX : ts.ScriptKind.JS);
  const specifiers = [];
  const visit = (node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0])) {
      specifiers.push(node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  };
  visit(parsed);
  for (const specifier of specifiers.filter((value) => value.startsWith('.'))) {
    if (!resolveRelativeImport(file, specifier)) {
      errors += 1;
      console.error(`${file} unresolved relative import: ${specifier}`);
    }
  }
}

if (errors) {
  console.error(`Syntax check failed with ${errors} error(s).`);
  process.exit(1);
}
console.log(`Syntax check passed for ${files.length} JavaScript/JSX files.`);
