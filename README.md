## Key Features

- **Authentication & Authorization**
  - JWT-based authentication with auto refresh token mechanism
  - Role-based access control (RBAC)
  - Secure route protection

- **Admin Management**
  - User administration with detailed profiles
  - Permission management
  - System configuration controls

- **Modern UI/UX**
  - Responsive Element UI components
  - Dynamic theming support
  - Interactive dashboards
  - Multi-language support (i18n)

- **Developer Experience**
  - TypeScript for enhanced code quality
  - Vue Class Component pattern
  - Modular architecture
  - Comprehensive API integration

## Tech Stack

- Vue.js 2.6.10
- TypeScript
- Element UI 2.15.1
- Vuex for state management
- Vue Router for navigation
- Axios for API requests
- JWT for authentication
## Project Structure

```bash
├── mock/                      # mock server & mock data
├── public                     # public static assets (directly copied)
│   │── favicon.ico            # favicon
│   │── manifest.json          # PWA config file
│   └── index.html             # index.html template
├── src                        # main source code
│   ├── api                    # api service
│   ├── assets                 # module assets like fonts, images (processed by webpack)
│   ├── components             # global components
│   ├── directives             # global directives
│   ├── filters                # global filter
│   ├── icons                  # svg icons
│   ├── lang                   # i18n language
│   ├── layout                 # global layout
│   ├── pwa                    # PWA service worker related files
│   ├── router                 # router
│   ├── store                  # store
│   ├── styles                 # global css
│   ├── utils                  # global utils
│   ├── views                  # views
│   ├── App.vue                # main app component
│   ├── main.ts                # app entry file
│   ├── permission.ts          # permission authentication
│   ├── settings.ts            # setting file
│   └── shims.d.ts             # type definition shims
├── tests/                     # tests
├── .circleci/                 # automated CI configuration
├── .browserslistrc            # browserslist config file (to support Autoprefixer)
├── .editorconfig              # editor code format consistency config
├── .env.xxx                   # env variable configuration
├── .eslintrc.js               # eslint config
├── babel.config.js            # babel config
├── jest.config.js             # jest unit test config
├── package.json               # package.json
├── postcss.config.js          # postcss config
├── tsconfig.json              # typescript config
└── vue.config.js              # vue-cli config
```

## Project setup

With [yarn](https://yarnpkg.com/lang/en/) or [npm](https://www.npmjs.com/get-npm)

#### Install dependencies

```bash
yarn install
```

#### Compiles and hot-reloads for development

```bash
yarn run serve
```

#### Compiles and minifies for production

```bash
yarn run build:prod
```

#### Lints and fixes files

```bash
yarn run lint
```

#### Run your unit tests

```bash
yarn run test:unit
```

#### Generate all svg components

```bash
yarn run svg
```

#### Customize Vue configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Browser Support

The system supports all modern browsers and IE11+.

## License

[MIT License](LICENSE)
