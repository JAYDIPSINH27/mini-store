import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./auth/register";
import Login from "./auth/login";
import Home from "./Screens/Home";
import ForgotPassword from "./auth/forgotPassword";
import ChangePassword from "./auth/changePassword";
import HomePage from "./components/Homepage/HomePage";
import { PaymentTest } from "./components/stripe";
import Layout from "./components/Layout";
import StoreList from "./components/shop/StoreList";
import Feed from "./components/Products/Feed";
import Shop from "./components/shop/Shop";
import CartPage from "./components/Cart/CartPage"
import { Provider } from "react-redux";
import store from "./redux/store";
import Profile from "./components/Profile/Profile";
import ProfileEdit from "./components/Profile/ProfileEdit";
import Search from "./components/SearchBar/Search"
import DashboardHome from "./components/Dashboard/DashboardHome";
import ProductList from "./components/Dashboard/ProductList";
import AddProduct from "./components/Dashboard/AddProduct";
import StoreDetails from "./components/Dashboard/StoreDetails";
import Orders from "./components/Orders/OrderPage"

function App() {
  console.log("store : ", store);
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route path="/payment" component={PaymentTest} /> */}
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
                <Route path="/store/:id" component={Shop} />
                <Route path="/cart" component={CartPage} />
                <Route path="/payment" component={PaymentTest} />
                <Route path="/profile" component={Profile}/>
                <Route path="/edit/profile" component={ProfileEdit}/>
                <Route path="/search/:name" component={Search}/>
                <Route path="/orders" component={Orders}/>

                <Route exact path="/dashboard" component={DashboardHome} />
                <Route path="/dashboard/product/view" component={ProductList} />
                <Route path="/dashboard/product/add" component={AddProduct} />
                <Route path="/dashboard/store/details" component={StoreDetails} />
              </Switch>
            </Layout>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
