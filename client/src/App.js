import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./auth/register";
import Login from "./auth/login";
import Home from "./Screens/Home";
import ForgotPassword from "./auth/forgotPassword";
import ChangePassword from './auth/changePassword';
import HomePage from "./components/Homepage/HomePage";
import { PaymentTest } from "./components/stripe";
import Layout from "./components/Layout";
import StoreList from "./components/shop/StoreList";
import Feed from "./components/Products/Feed"
import Shop from "./components/shop/Shop";
import Dashboard from "./components/Dashboard/Dashboard";

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

              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
