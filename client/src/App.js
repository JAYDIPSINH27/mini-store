import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Register from "./auth/register";
import Login from "./auth/login";
import Home from "./Screens/Home";
import ForgotPassword from "./auth/forgotPassword";
import ChangePassword from './auth/changePassword';
import Products from "./components/ProductsPage";
import HomePage from "./components/Homepage/HomePage";
import { PaymentTest } from "./components/stripe";
import Layout from "./components/Layout";
import StoreList from "./components/shop/StoreList";
import Feed from "./components/Feed"
import Shop from "./components/shop/Shop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path='/test' component={PaymentTest}/>
          <Route path="/signup" component={Register} />
          <Route path="/signin" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/change-password" component={ChangePassword} />
          <Layout>
            <Switch>
              <Route path="/products" component={Feed} />
              <Route path="/stores" component={StoreList} />
              <Route path="/store/:id" component={Shop} />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
