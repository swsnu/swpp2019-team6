import React from 'react';
import './App.css';

import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import CreateTravel from './pages/CreateTravel';
import SearchPage from './pages/SearchPage';
import UserInfoPage from './pages/UserInfoPage';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path={['/', '/login']} exact render={() => <LoginPage />} />
          <Route path="/sign_up" exact render={() => <SignupPage />} />
          <Route path="/main" exact render={() => <MainPage />} />
          <Route path="/travel/create" exact render={() => <CreateTravel />} />
          <Route path="/search" component={SearchPage} />
          <Route path="/user/:nickname" component={UserInfoPage} />
          <Route render={() => <div id="error"><h1>Not Found</h1></div>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
