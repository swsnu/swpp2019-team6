import React from 'react';
import './App.css';

import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import CreateTravel from './pages/CreateTravel';
import EditTravel from './pages/EditTravel';
import TravelDetail from './pages/TravelDetail';
import SearchPage from './pages/SearchPage';
import UserInfoPage from './pages/UserInfoPage';
import TravelSettingsPage from './pages/TravelSettingsPage';
import EditUserInfoPage from './pages/EditUserInfoPage';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path={['/', '/login']} exact render={() => <LoginPage />} />
          <Route path="/sign_up" exact render={() => <SignupPage />} />
          <Route path="/main" exact render={() => <MainPage />} />
          <Route path="/travel/create" exact render={() => <CreateTravel />} />
          <Route path="/travel/:id/" exact render={() => <TravelDetail />} />
          <Route path="/travel/:id/edit/" exact render={() => <EditTravel />} />
          <Route path="/travel/:id/settings" exact component={TravelSettingsPage} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/user/:id" exact component={UserInfoPage} />
          <Route path="/user/:id/edit" exact component={EditUserInfoPage} />
          <Route render={() => <div id="error"><h1>Not Found</h1></div>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
