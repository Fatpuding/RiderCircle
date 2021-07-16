import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Admin from './pages/admin/home/home';
import Client from './pages/client/home/home';

function App() {

  return (
      <div className="App">

          <BrowserRouter>
              <Switch>
                  <Route path="/admin" component={Admin} />
                  <Route path="/client" component={Client} />
                  <Redirect from="/" exact to="/client" />
              </Switch>
          </BrowserRouter>  
              
      </div>
  );
}

export default App;

