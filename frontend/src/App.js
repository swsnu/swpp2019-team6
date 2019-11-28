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
import TravelSettingsPage from './pages/TravelSettingsPage';

function App(props) {
  // console.log(props.history.location);
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path={['/', '/login']} exact render={() => <LoginPage />} />
          <Route path="/sign_up" exact render={() => <SignupPage />} />
          <Route path="/main" exact render={() => <MainPage />} />
          <Route path="/travel/create" exact render={() => <CreateTravel />} />
          <Route path="/travel/:id/settings" component={TravelSettingsPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/user/:nickname" component={UserInfoPage} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
