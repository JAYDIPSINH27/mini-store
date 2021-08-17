import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Register from "./auth/register";
import Login from "./auth/login";
import Home from "./Screens/Home";
import ForgotPassword from "./auth/forgotPassword";
import ChangePassword from './auth/changePassword';
import { PaymentTest } from "./components/stripe";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/test' component={PaymentTest}/>
          <Route path="/signup" component={Register} />
          <Route path="/signin" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/change-password" component={ChangePassword} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
