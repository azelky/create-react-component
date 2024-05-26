// Overriding config file name
export const configFileName = '.create-component-config.json';

// Style extensions available or none if no styles file needed
export const styleTypes = {
  css: '.css',
  cssModule: '.module.css',
  scss: '.scss',
  scssModule: '.module.scss',
  none: 'none'
};

export const defaultConfig = {
  lang: 'ts',
  dir: 'app/ui',
  style: styleTypes.scssModule
};

// Lang names
const langNames = {
  js: 'JavaScript',
  ts: 'TypeScript'
};

const _langNames = Object.freeze(langNames);
export { _langNames as langNames };

// Colors
const colors = {
  red: [255, 0, 111],
  white: [255, 255, 255],
  green: [115, 255, 102],
  blue: [77, 210, 255],
  gold: [255, 225, 77],
  purple: [195, 128, 255],
  mediumGray: [179, 179, 179],
  darkGray: [128, 128, 128]
};

const _colors = Object.freeze(colors);
export { _colors as colors };

// Texts for different cases
export const texts = {
  componentNameMissing: `Sorry, you need to specify a name for your component 🧐\nThe expected format is: create-component <name>`,
  directoryCreated: 'Directory created 📂',
  componentCreated: 'Component created and saved 👍',
  indexFileCreated: 'Index file created and saved 👌',
  fullPath: '   Full path:',
  createdComponentDirectory: ` ▸ Directory:`,
  createdComponentLanguage: ` ▸ Language: `,
  delimiter: '------------------------------------------------------------------',
  error: '🚫 Error creating component 😱'
};

export function textCreatingComponent(componentName) {
  return `\n✨ Creating the ˗ˏˋ${componentName}´ˎ˗ component ✨\n`;
}

export function textComponentAlreadyExists(componentDirectory) {
  return `   Looks like a component with the same name already exists in ${componentDirectory} 🫣\n   Please delete this directory and try again, or create another component 👀`;
}

export function textComponentCreatedDirectory(componentDirectory) {
  return `👉 Component will be created in the ${componentDirectory} directory`;
}

export function textComponentCreated(componentName) {
  return `🎉 Yay, ${componentName} component created! 🎉`;
}

export const celebrations = [
  'ʕっ•ᴥ•ʔっ',
  'ʕ♥ᴥ♥ʔ',
  `♥‿♥`,
  '(/¯◕ ‿ ◕)/¯',
  '※\\(^o^)/※',
  'ᕕ( •‿•)ᕗ',
  'ᕦ(^ᴥ^)ᕥ',
  '<(^_^)>',
  'ᕙ(`▽´)ᕗ',
  'ᕕ( ᐛ )ᕗ',
  '༼つ ◕‿◕ ༽つ'
];
