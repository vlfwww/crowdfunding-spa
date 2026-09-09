# Crowdfunding

A single-page React application for leasing and investing in agricultural land plots.

## Features

- User registration, login, and logout;
- Land plot catalog with sorting and filtering by price and size;
- Map view of plots and location-based search;
- Plot reservation and investment processing;
- My plots, wallet, profile, and contacts pages;
- Local data storage for user profiles and actions via `localStorage`;
- Catalog fetching via DummyJSON API.

## Tech Stack & Dependencies

### Core Dependencies

- [React](https://react.dev/) & [React DOM](https://react.dev/);
- [React Router](https://reactrouter.com/) — routing;
- [Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/) — state management and queries;
- [React Leaflet](https://react-leaflet.js.org/) & [Leaflet](https://leafletjs.com/) — maps;
- [DummyJSON](https://dummyjson.com/) — land plots data source.

### Development Tools

- [Webpack](https://webpack.js.org/) & `webpack-dev-server`;
- Babel (`@babel/core`, `@babel/preset-env`, `@babel/preset-react`, `babel-loader`);
- `css-loader`, `style-loader`;
- `html-webpack-plugin`.

## Getting Started

Requires Node.js 20 or newer and npm.

1. Install dependencies:

```bash
   npm install
```

2. Run the development server:

```bash
npm run dev
```

The application will open at [http://localhost:3000](http://localhost:3000).

3. Build for production:

```bash
   npm run build
```

The built files will be saved in the dist/ directory.

## Deployment

The project is live on GitHub Pages:

[https://vlfwww.github.io/crowdfunding-spa/](https://vlfwww.github.io/crowdfunding-spa/)


### Code Quality & Validation

- **HTML & CSS Validation:** The project's HTML templates and CSS styles comply with W3C standards and successfully pass all validation checks, ensuring semantic correctness and cross-browser compatibility.
