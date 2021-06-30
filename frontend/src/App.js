import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import store from "./store";
import AlertTemplate from "react-alert-template-mui";
import { positions, Provider as AlertProvider } from "react-alert";
import Alerts from "./components/layout/Alerts";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Logout from "./pages/Logout";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import Manager from "./pages/Manager";
import { loadUser, registerManager, registerTeacher } from "./actions/auth";
import { setMobile, setFullWidth } from "./actions/style";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterTeacher from "./pages/RegisterTeacher";
import RegisterManager from "./pages/RegisterManager";
import { SnackbarProvider } from "notistack";

// import "./teachers/css/style.scss";

const history = createBrowserHistory();
const alertOptions = {
  timeout: 3000,
  position: positions.TOP_CENTER,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    store.dispatch(loadUser());
    this.updateDimensions();
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;

    this.setState({ windowWidth });
  }

  render() {
    if (this.state.windowWidth < 960) {
      store.dispatch(setMobile());
    } else {
      store.dispatch(setFullWidth());
    }

    return (
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Fragment>
              <Alerts />

              <Router history={history}>
                <main>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgotpassword" component={Forgot} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/student" component={Student} />
                </main>
              </Router>
            </Fragment>
          </AlertProvider>
        </Provider>
      </SnackbarProvider>
    );
  }
}

export default App;
