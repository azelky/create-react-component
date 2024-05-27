#!/usr/bin/env node
import { existsSync } from 'fs';
import { resolve } from 'path';
import { program, Option } from 'commander';

import { colors, texts, textComponentAlreadyExists, styleTypes } from './consts.js';
import { mkDirPromise, readFilePromiseRelative, writeFilePromise, require } from './utils.js';
import {
  getConfig,
  buildPrettifier,
  createParentDirectoryIfNecessary,
  logIntro,
  logItemCompletion,
  logConclusion,
  logError,
  logInColor,
  getCssFileInfo
} from './helpers.js';

// Load our package.json, so that we can pass the version onto `commander`
const PACKAGE_JSON = require('../package.json');
const version = PACKAGE_JSON.version;

// Get the default config for the component creation
const config = getConfig();

// Convenience wrapper around Prettier, so that
// config doesn't have to be passed every time.
const prettify = buildPrettifier(config.prettierConfig);

// Program implementation and available CLI params, with help if needed
program
  .version(version)
  .arguments('<componentName>')
  .addOption(new Option('-l, --lang <language>', `Which language to use`).default(config.lang).choices(['js', 'ts']))
  .option('-d, --dir <pathToDirectory>', 'Path to the components directory', config.dir)
  .addOption(
    new Option('-s, --style <styleExtension>', `Extension for styles file`).default(config.style).choices(Object.values(styleTypes))
  )
  .showHelpAfterError('(add --help for additional information)')
  .parse(process.argv);

const [componentName] = program.args;
const options = program.opts();

// File extensions according to program elements
const fileExtension = options.lang === 'js' ? 'js' : 'tsx';
const indexExtension = options.lang === 'js' ? 'js' : 'ts';
const styleExtension = options.style;

// Find the path to the selected template file
const templatePath = `./templates/${options.lang}.js`;

// Get all of our file paths worked out for the user's project
const componentDir = `${options.dir}/${componentName}`;
const filePath = `${componentDir}/${componentName}.${fileExtension}`;
const indexPath = `${componentDir}/index.${indexExtension}`;

// Our index.{js|ts} template
const indexTemplate = prettify(`\
export * from './${componentName}';
export { default as ${componentName} } from './${componentName}';
`);

// First step logged in with component info from user or default config
logIntro({
  name: componentName,
  dir: componentDir,
  lang: options.lang
});

// Check if componentName is provided
if (!componentName) {
  logError(texts.componentNameMissing);
  process.exit(0);
}

// Check to see if the parent directory exists and create it if it doesn't
createParentDirectoryIfNecessary(options.dir);

// Check to see if this component has already been created
const fullPathToComponentDir = resolve(componentDir);

// Exits if a similar component already exists
if (existsSync(fullPathToComponentDir)) {
  logError(`${textComponentAlreadyExists(logInColor(colors.gold, componentDir))}`);
  process.exit(0);
}

// Start by creating the directory to host our component
mkDirPromise(componentDir)
  .then(() => readFilePromiseRelative(templatePath))
  .then((template) => {
    logItemCompletion(texts.directoryCreated);
    return template;
  })
  .then((template) => {
    const cssInfo = {
      componentDir,
      styleExtension,
      componentName
    };

    const { styleFile, cssClass } = getCssFileInfo(cssInfo);

    // Replace our STYLES placeholder with style file in case it's needed
    return template.replace(/STYLES/g, styleFile).replace(/CLASSNAME/g, cssClass);
  })
  .then((template) =>
    // Replace our placeholders with real data (so far, just the component name)
    template.replace(/COMPONENT_NAME/g, componentName)
  )
  .then((template) =>
    // Format it using prettier, to ensure style consistency, and write to file.
    writeFilePromise(filePath, prettify(template))
  )
  .then((template) => {
    logItemCompletion(texts.componentCreated);
    return template;
  })
  .then((_) =>
    // We also need the `index.js` file, which allows easy importing.
    writeFilePromise(indexPath, prettify(indexTemplate))
  )
  .then((template) => {
    logItemCompletion(texts.indexFileCreated);
    return template;
  })
  .then((_) => {
    logConclusion(componentName);
  })
  .catch((err) => {
    console.error(err);
  });
