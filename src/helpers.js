import { homedir } from 'os';
import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import pkgPrettier from 'prettier';
const { resolveConfig, format } = pkgPrettier;

import { requireOptional, writeFilePromise } from './utils.js';

import {
  defaultConfig,
  colors,
  texts,
  configFileName,
  langNames,
  textComponentCreatedDirectory,
  textCreatingComponent,
  textComponentCreated,
  celebrations
} from './consts.js';

// Get the configuration elements for the component to create
// Overrides priority are as follows in ascending order:
//  - default values in the library
//  - globally-set overrides in user home directory
//  - project-specific overrides in project root
//  - command-line arguments

// The CLI args aren't processed here; this config is used when no CLI argument
// is provided.
export function getConfig() {
  const home = homedir(),
    currentPath = process.cwd();
  const HOMEPATH = `/${home}/${configFileName}`,
    CURRENT_PATH = `/${currentPath}/${configFileName}`;
  const globalOverrides = requireOptional(HOMEPATH),
    localOverrides = requireOptional(CURRENT_PATH);

  return { ...defaultConfig, ...globalOverrides, ...localOverrides };
}

export function buildPrettifier() {
  let config = resolveConfig.sync(process.cwd());

  // default prettier config:
  config = config || {
    semi: true,
    singleQuote: true,
    trailingComma: 'es5'
  };
  config.parser = config.parser || 'babel';

  return (text) => format(text, config);
}

// Helper to log in a given color
export function logInColor(color, text, bold = false) {
  return bold === true ? chalk.rgb(...color).bold(text) : chalk.rgb(...color)(text);
}

// Create directories recursively if needed
// in order to have the needed path for the component to create
export async function createParentDirectoryIfNecessary(dir) {
  const fullPathToParentDir = resolve(dir);

  console.info(textComponentCreatedDirectory(logInColor(colors.gold, dir, true)));
  console.info(`${logInColor(colors.mediumGray, texts.fullPath)} ${logInColor(colors.purple, fullPathToParentDir)}\n`);

  if (!existsSync(fullPathToParentDir)) {
    mkdirSync(dir, { recursive: true });
  }
}

// From PascalCase to kebab-case when needed, eg for css modules files or classNames
export const toKebabCase = (text) => text.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();

// Manage CSS creation file info for all different cases
export function getCssFileInfo(info) {
  let styleFile = '',
    cssClass = '',
    cssClassName = '',
    cssFileName = '';

  switch (info.styleExtension) {
    case '.css':
    case '.scss':
      cssClassName = `${info.componentName}`;
      cssFileName = `${cssClassName}${info.styleExtension}`;
      styleFile = `import './${cssFileName}';\n\n`;
      cssClass = ` className="${info.componentName}"`;

      writeFilePromise(`${info.componentDir}/${cssFileName}`, '');
      break;

    case '.module.css':
    case '.module.scss':
      cssClassName = `${toKebabCase(info.componentName)}`;
      cssFileName = `${cssClassName}${info.styleExtension}`;
      styleFile = `import styles from './${cssFileName}';\n\n`;
      cssClass = cssClassName.indexOf('-') !== -1 ? ` className={styles['${cssClassName}']}` : ` className={styles.${cssClassName}}`;

      writeFilePromise(`${info.componentDir}/${cssFileName}`, '');
      break;

    case 'none':
    default:
      break;
  }

  if (cssFileName !== '') {
    const cssTemplate = `.${cssClassName} {\n\n}`;
    const cssFilePath = `${info.componentDir}/${cssFileName}`;
    writeFilePromise(cssFilePath, cssTemplate);
  }

  return {
    styleFile,
    cssClass
  };
}

// Log the available and picked language on component creation
const logComponentLang = (selected) =>
  ['js', 'ts']
    .map((option) =>
      option === selected ? `[ ${logInColor(colors.blue, langNames[option], true)} ]` : `${logInColor(colors.darkGray, langNames[option])}`
    )
    .join(` ${logInColor(colors.darkGray, '|')} `);

// Log Introduction info about compoennt name, directory and language picked
export function logIntro({ name, dir, lang }) {
  const pathString = logInColor(colors.blue, dir, true);
  const langString = logComponentLang(lang);

  console.info(textCreatingComponent(logInColor(colors.gold, name, true)));
  console.info(logInColor(colors.purple, texts.delimiter));
  console.info(`${texts.createdComponentDirectory} ${pathString}`);
  console.info(`${texts.createdComponentLanguage} ${langString}`);
  console.info(`${logInColor(colors.purple, texts.delimiter)}\n`);
}

// Log complete elements after creation
export function logItemCompletion(successText) {
  const checkmark = logInColor(colors.green, '✅');
  console.info(`${checkmark} ${successText}`);
}

// Log conclusion elements and celebration after component creation
export function logConclusion(componentName) {
  console.info('\n');
  console.info(logInColor(colors.green, textComponentCreated(componentName)));
  console.info(logInColor(colors.green, `   ${getCelebration(celebrations)}`));
  console.info('\n');
}

// Log error encountered in the process of component creation
export function logError(error) {
  console.info(logInColor(colors.red, texts.error, true));
  console.info(logInColor(colors.red, error));
  console.info('\n');
}

// Log a small ascii text celebration after component creation, yay!!
function getCelebration(items) {
  return items[Math.floor(Math.random() * items.length)];
}
