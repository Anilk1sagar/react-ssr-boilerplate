import React from 'react';
import Loadable from 'react-loadable';
import { NavLink } from 'react-router-dom';
import AppRoutes from "./app.routes";
import './App.css';

const AsyncComponent = Loadable({
  loader: () => import('./components/SomeComponent'),
  loading: () => <div>loading...</div>
});


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/assets/images/logo.svg" className="App-logo" alt="logo" width="200" height="200" />
        <h1 className="App-title">Welcome to React</h1>
      </header>

      <div className="App-intro">
        <h2>Part 1: Async component</h2>
        <AsyncComponent />

        <hr />

        <h2>Part 2: Redux store</h2>
        {/* <p>
            Redux: {props.message}
        </p> */}

        <hr />

        <h2>Part 3: React router</h2>
        <nav>
          <NavLink to={`/`} exact activeClassName="active">Home</NavLink>
          <NavLink to={`/another`} activeClassName="active">Another page</NavLink>
          <NavLink to={`/another/child`} activeClassName="active">Another page CHild</NavLink>
        </nav>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
