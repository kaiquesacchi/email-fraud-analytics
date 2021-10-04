# Email Fraud Analytics

A tool-set that helps identifying frauds in a list of e-mail addresses.

## Running the project

### Development

```
yarn
yarn start
```

A development server will open on port 3000

### Production

```
yarn
yarn build
```

A build will be generated on `/dist` folder

## Boilerplate creation process

The `react + typescript + electron` boilerplate was generated as follows:

```sh
npx create-react-app <app_name> --template typescript

yarn add -D electron electron-builder cross-env concurrently wait-on
yarn add electron-is-dev
```

- Added `/public/electron.js` file
- Modified `"main"` and `"scripts"` fields in `package.json`
