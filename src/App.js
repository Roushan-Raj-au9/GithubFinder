import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './containers/Home';
import Alert from './components/Alert';
import About from './containers/About';
import DisplayUser from './components/users/DisplayUser';
import NotFound from './containers/NotFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <div className="container" >
              <Alert />
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/about' exact component={About} />
                <Route path='/user/:login' component={DisplayUser} />
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
}

export default App;


