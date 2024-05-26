# create-react-component

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
$ npm i -g @azelky/create-react-component

# or, using Yarn:
$ yarn global add @azelky/create-react-component
```

`cd` into your project's directory, and try creating a new component:

```bash
$ create-component MyShinyComponent
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

- Creating a global `.create-component-config.json` in your home directory (`~/.create-component-config.json`).
- Creating a local `.create-component-config.json` in your project's root directory.
- Command-line arguments.

The resulting values are merged, with command-line values overwriting local values, and local values overwriting global ones.

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
- `cd` into the directory and install dependencies (`yarn install` or `npm install`)
- Set up a symlink by running `npm link`, while in the `create-react-component` directory. This will ensure that the `create-component` command uses this locally-cloned project, rather than the global NPM installation.
- Spin up a test React project.
- In that test project, use the `create-component` command to create components and test that your changes are working.
