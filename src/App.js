import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import CreateCTs from './components/CreateCTs';
import CreateProjectFile from './components/CreateProjectFile';
import Menu from './components/Menu';

function App() {
  return (
    <div> 
     <BrowserRouter>
     <Menu />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/CT" component={CreateCTs} />
          <Route path="/PJT" component={CreateProjectFile} />
        </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
