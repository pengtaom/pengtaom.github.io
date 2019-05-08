#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
let components = require('../components.config.js');

// create index.js
let indexContent = '// !!! This file will be generated by ./tool/create.js auto\n\n';
let umdContent = '// !!! This file will be generated by ./tool/create.js auto\n\n';
components = components.filter(component => {
  return !component.includes('_');
});
components.forEach(component => {
  indexContent += `export { default as ${component} } from './${component}';\n`;
  umdContent += `import ${component} from '../../scaffold/src/components/${component}';\n`;
});

umdContent += '\nexport default {\n';

components.forEach(component => {
  umdContent += `${component},\n`;
});

umdContent += '};\n';

indexContent = prettier.format(indexContent, { semi: false, parser: 'babylon' });
umdContent = prettier.format(umdContent, { semi: false, parser: 'babylon' });
fs.writeFileSync(path.join(__dirname, '../index.js'), indexContent);
fs.writeFileSync(path.join(__dirname, '../index.d.ts'), indexContent);
fs.writeFileSync(path.join(__dirname, '../umd.js'), umdContent);
