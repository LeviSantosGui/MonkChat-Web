import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import MonkChat from './Pages/MonkChat';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/chat" exact={true} component={MonkChat} />
      </Switch>
    </BrowserRouter>
  );
};