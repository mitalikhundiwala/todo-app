# Test solution for WakeCap assignment

The project is using parcel for bundling and transpilation with Typescript & React for rendering, Redux for state management.

## Hosted version

The page is hosted on Netlify & can be accessed via [https://wakecap-test.netlify.com/](https://wakecap-test.netlify.com/)

## Highlights

- Seperation of data & UI using Redux
- Strict data typing using Models
- Seperate service classes for encapsulating data loading & processing
- Using Localstorage to persist changes, which is merged with data loaded from json file
- Responsive & elegant UI using Reactstrap

## Major packages used

-   `typescript`
-   `react`
-   `redux`, `redux-thunk` & `react-redux`, for state management
-   `reactsrapt`, as component library
-   `date-fns` as datetime library
-   `eslint` for linting
-   `prettier` for code formatting
-   `parcel-bundler` for bundling & transpilation
-   `jest` for testing

# To setup project

1. Install NodeJS
2. Install global npm packages.
   `npm install -g parcel-bundler`
3. Run `npm install` command to install dependecies.

## To run on development environment

1. Please setup project with above steps.
2. Run `npm start` command. It will build application and will automatically start local server. If browser window doesn't open automatically, you can navigate to URL `http://localhost:1234`. Default port is 1234.

## To build for production environment

1. Please setup project with above steps.
2. Run `npm run build` command. It will build application in `dist` folder.

## To run tests

1. Please setup project with above steps.
2. Run `npm test` command. It will show the test result for given test data along with coverage report.
