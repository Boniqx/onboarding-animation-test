## Directory Structure

The top level directory structure will be as follows:

- assets - global static assets such as images, svgs, company logo, etc.
- components - global shared/reusable components, such as layout (wrappers, navigation), form components, buttons
- modules - JavaScript modules (all components under specific page should go here, e.g. **modules/dashboard/component.tsx** will contain components rendered in **pages/dashboard.tsx**)
- store - Global Redux store
- utils - Utilities & helper functions and the like
- pages - NextJS page files

## Path aliasing

Added path aliasing **(@folder-name)** is used to easily determine which files were imported locally and from library, this is very helpful for better organization of imports. Library imports should come first then local.

## Graphql codegen

Running **graphql-codegen** requires you to add **.env** file with `API_URL`'s value as your graphql endpoint. After doing so, you can do `npm run codegen` which will auto generate the typescript definitions for you.

## We use this tools

- [ESLint](https://eslint.org/docs/user-guide/configuring/)
- [Husky](https://typicode.github.io/husky/#/)
- [Prettier](https://prettier.io/)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
- [graphql-codegen](https://www.graphql-code-generator.com/)

### [Structure reference](https://www.taniarascia.com/react-architecture-directory-structure)
