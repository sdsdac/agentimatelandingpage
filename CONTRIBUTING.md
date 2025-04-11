# Contributing

## Bug fixes

First make sure the bug you want to report or fix hasn't been already reported in the [GitHub issues](https://github.com/juliangarnier/anime/issues?q=is%3Aissue+label%3Abug).
If the bug you want to work on doesn't have a related issue, [open one](https://github.com/juliangarnier/anime/issues/new?template=bug_report.md), and attach the "Bug" label.

## New features

Before adding any features, open a [Feature Proposal](https://github.com/juliangarnier/anime/issues/new?template=feature_request.md) and attach the "Feature Proposal" label.
This will allow us to discuss the necessity of the feature, API design and implementation details before you invest time working on it.

## Development

Anime.js is written in JavaScript and the type definitions are generated from [JSDoc](https://jsdoc.app/) annotations.
JSDoc types used globally in the project are defined in the `src/types.js` file, otherwise JSDoc types should be defined straight in their corresponding file.

Before opening a PR, follow these steps to properly build and test the project:

1. Clone your fork to your computer.
2. Install the NPM dependencies `npm i`.
3. Modify or add `.js` files in `/src`, with valid JSDoc annotations.
4. Run `npm run dev-types` to build the `anime.esm.js` and `index.d.ts` files by watching changes in `/src`.
5. Add the necessary tests to `/test/suites/` to the relevant file.
6. Run `npm run test-browser` to make sure you haven't broken anything and all the tests are passing.
7. Create a pull request on the **[`dev`](https://github.com/juliangarnier/anime/tree/dev)** branch.
