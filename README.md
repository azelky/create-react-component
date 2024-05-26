# react-new-component-cli

<div align="center">
  <img src="https://github.com/azelky/react-new-component-cli/blob/main/docs/react-new-component-cli.svg?raw=true" width="270" height="248" alt="react-new-component-cli logo">
  <br><br>
  <a href="https://www.npmjs.org/package/react-new-component-cli"><img src="https://img.shields.io/npm/v/react-new-component-cli.svg?style=flat" alt="npm"></a>
</p>

</div>

### Simple, customizable utility for adding new React / Next components to your project

This project is a CLI tool that allows you to quickly scaffold new components. All of the necessary boilerplate will be generated automatically.

<br />

## Features

- Simple CLI interface for adding React components.
- Uses [Prettier](https://github.com/prettier/prettier) to stylistically match the existing project.
- Offers global config, which can be overridden on a project-by-project basis.
- Colourful terminal output!

<br />

## Quickstart

Install via NPM:

```bash
# Using NPM
$ npm i -g react-new-component-cli

# or, using Yarn:
$ yarn global add react-new-component-cli
```

`cd` into your project's directory, and try creating a new component:

```bash
$ rnc MyShinyComponent
```

Your project will now have a new directory at `app/ui/MyShinyComponent`. This directory has three files:

```ts
// `MyShinyComponent/index.ts`
export * from './MyShinyComponent';
export { default } from './MyShinyComponent';
```

```tsx
// `MyShinyComponent/MyShinyComponent.tsx`
import styles from 'my-shiny-component.module.scss';

function MyShinyComponent() {
  return <div></div>;
}

export default MyShinyComponent;
```

These files will be formatted according to your Prettier configuration.

<br />

## Configuration

Configuration can be done through 3 different ways:

- Creating a global `.react-component-config.json` in your home directory (`~/.react-component-config.json`).
- Creating a local `.react-component-config.json` in your project's root directory.
- Command-line arguments.

The resulting values are merged, with command-line values overwriting local values, and local values overwriting global ones.

Example JSON configuration file:

```json
{
  "lang": "ts",
  "style": ".scss",
  "dir": "src/components"
}
```

<br />

## API Reference

### Language

Controls which language, JavaScript or TypeScript, should be used.

- `ts` — creates a `.tsx` file (default).
- `js` — creates a `.js` file.

Note that all components created will be functional components. Class components are not supported.

**Usage:**

Command line: `--lang <value>` or `-l <value>`

JSON config: `{ "lang": <value> }`
<br />

### Directory

Controls the desired directory for the created component. Defaults to `app/ui`

**Usage:**

Command line: `--dir <value>` or `-d <value>`

JSON config: `{ "dir": <value> }`
<br />

### Style type

Controls the desired included style file extension for the created component. Defaults to `.module.scss`

Available values:

- `.module.scss` or `.module.css` for modules — the component name will be transposed to kebab-case
- `.scss` or `.css` for classic styles file — the component name will be kept PascalCase style
- `none` if you don't want any style file included.

**Usage:**

Command line: `--style <styleExtension>` or `-s <styleExtension>`

JSON config: `{ "style": <value> }`
<br />

## Platform Support

This has only been tested in MacOS environment.
<br />

## Development

To get started with development:

- Fork and clone the Git repo
- `cd` into the directory and install dependencies (`npm install` or `yarn install`)
- Set up a symlink by running `npm link`, while in the `react-new-component-cli` directory. This will ensure that the `rnc` command uses this locally-cloned project, rather than the global NPM installation.
- Spin up a test React project.
- In that test project, use the `rnc` command to create components and test that your changes are working.
