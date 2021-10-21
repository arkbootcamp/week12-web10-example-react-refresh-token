import { BrowserRouter, Router, Route, Switch } from 'react-router-dom'
import Login from './page/Login'
import Product from './page/Product'
import history from './history'
function App() {
  return (
    // <BrowserRouter >
      <Router history={history}>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/product' component={Product} />
        </Switch>
      </Router>
    // </BrowserRouter>
  );
}

export default App;
