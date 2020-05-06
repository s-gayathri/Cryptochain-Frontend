import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import history from "./history";
import Blocks from './Components/Blocks';
import ConductTransaction from "./Components/ConductTransaction";
import * as serviceWorker from './serviceWorker';
import TransactionPool from './Components/TransactionPool';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/" component={App} />
        <Route path="/blocks" component={Blocks} />
        <Route path="/conduct-transaction" component={ConductTransaction} />
        <Route path="/transaction-pool" component={TransactionPool} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
