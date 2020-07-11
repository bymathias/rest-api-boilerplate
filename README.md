# [RESTful API Boilerplate](https://github.com/bymathias/rest-api-boilerplate)

[![Github Release][github-release-img]][github-release-url]
[![dependencies][david-dm-dependencies-img]][david-dm-dependencies-url]
[![devDependencies][david-dm-devDependencies-img]][david-dm-devDependencies-url]

> Minimalist RESTful API Boilerplate and build process to quickly get projects going.

## Features

**Development tools:**

- [Webpack 4]() as module bundler
- ES6 support via [Babel](https://babeljs.io/)
- Lint via [ESLint](https://eslint.org/) - [JavaScript Standard Style](https://standardjs.com/)
- Unit tests via [Jest](https://jestjs.io/) - [SuperTest](https://www.npmjs.com/package/supertest)

**Frameworks/Libraries included:**

- [Express]() framework
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- Secure your app via [helmet](https://github.com/helmetjs/helmet)
- Loads environment variables via [dotenv](https://www.npmjs.com/package/dotenv)

## Installation

Clone the repository or download the [latest stable release][github-release-url]
```
git clone https://github.com/bymathias/rest-api-boilerplate.git api
```
Make it your own
```
cd api
rm -rf .git && git init && npm init
```
Then install dependencies
```
npm install
```
## Usage

**Development:**

Watch/run the Express server for development
```
npm run dev
```
Run unit tests (Jest)
```
npm test
```
**Production:**

Build for production
```
npm run build -- --mode=production
```
Run the Express server
```
npm start
```
## Change Log

All notable changes to this project will be documented in the [CHANGELOG](CHANGELOG.md).

## Contributing

All types of [contributions][how-to-contribute-url] are most welcome.

- [Project issue][project-new-issue-url]: Bug reports, feature requests, and feedback.
- [Merge/Pull request][project-pull-request-url]: Bug fixes, new features and documentation.

## License

The code is available under the MIT [LICENSE](LICENSE.txt).

[github-release-url]: https://github.com/bymathias/rest-api-boilerplate/releases/latest
[github-release-img]: https://img.shields.io/github/release/bymathias/rest-api-boilerplate.svg?style=flat-square

[david-dm-dependencies-url]:    https://david-dm.org/bymathias/rest-api-boilerplate
[david-dm-dependencies-img]:    https://img.shields.io/david/bymathias/rest-api-boilerplate.svg?style=flat-square
[david-dm-devDependencies-url]: https://david-dm.org/bymathias/rest-api-boilerplate?type=dev
[david-dm-devDependencies-img]: https://img.shields.io/david/dev/bymathias/rest-api-boilerplate.svg?style=flat-square

[how-to-contribute-url]:      https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github
[project-new-issue-url]:      https://github.com/bymathias/rest-api-boilerplate/issues/new
[project-pull-request-url]:   https://github.com/bymathias/rest-api-boilerplate/compare
