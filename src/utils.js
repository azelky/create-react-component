/*
Platform-specific utils, but not application-specific.
They abstract away the configuration for native methods,
or defining new convenience methods for things like working with files, etc.

NOTE: Utils should be general enough to be useful in any Node application.
For application-specific concerns, use `helpers.js`.
*/
import { mkdir, readFile, writeFile } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

// Access to __dirname
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// replace require in ES module
import { createRequire } from 'node:module';
export const require = createRequire(import.meta.url);

export function requireOptional(filePath) {
  try {
    return require(filePath);
  } catch (error) {
    // We want to ignore 'MODULE_NOT_FOUND' errors,
    // since the overriding configuration files are optional.
    // All other errors should be thrown as expected.
    if (error.code !== 'MODULE_NOT_FOUND') {
      throw error;
    }
  }
}

// Promise wrappers for directory creation
export function mkDirPromise(dirPath) {
  return new Promise((resolve, reject) => {
    mkdir(dirPath, (err) => {
      err ? reject(err) : resolve();
    });
  });
}

// Promise wrapper for readFile
export function readFilePromise(fileLocation) {
  return new Promise((resolve, reject) => {
    readFile(fileLocation, 'utf-8', (err, text) => {
      err ? reject(err) : resolve(text);
    });
  });
}

// Promise wrapper for writeFile
export function writeFilePromise(fileLocation, fileContent) {
  return new Promise((resolve, reject) => {
    writeFile(fileLocation, fileContent, 'utf-8', (err) => {
      err ? reject(err) : resolve();
    });
  });
}

// fs.readFile` works relative to the current working directory
// unlike `require()` calls that are always relative to the code's directory.
export function readFilePromiseRelative(fileLocation) {
  return readFilePromise(join(__dirname, fileLocation));
}
