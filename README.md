# Boilerplate

Create React App with Typescript, Emotion, and Onno. Also includes a number of styling components to assist with theming, layout, fonts & typography, and asset management.

## Setup

- `git clone git@github.com:havandenberg/boilerplate.git [project-name]` && `cd [project-name]`
- `yarn`
- `git remote -set-url origin [your-repo]`
- Update `package.json` name and version

## Public / Meta

- Upload favicon to `public/favicon.ico` (https://realfavicongenerator.net/)
- Update `<title>` tag in `public/index.html`
- Add meta tags (https://www.heymeta.com/)
- Update `manifest.json`

## Assets

### Fonts

1. Add font files to `src/assets/fonts`
2. Add font family names to `src/ui/fonts.css`
3. Update `fontFamilies` in `src/ui/theme.ts`

## UI

Components are styled using `emotion` and `onno` exposes styling as props on all components.

Basic components are located in `ui/`:

- `button.ts` - default, primary, and secondary components
- `layout.ts` - layout components
- `link.ts` - main link component
- `select.ts` - default select component
- `theme.ts` - theme variables
- `typography.tsx` - text components

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode; launches [http://localhost:3000](http://localhost:3000)
