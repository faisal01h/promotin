import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../../components/molecules";
import "./mainApp.scss";
import Home from "../Home";
import ItemDetail from "../ItemDetail";
import UpdateEvent from "../updateEvent";
import Login from "../Login";
import MyEvent from "../MyEvent";
import SavedEvent from "../SavedEvent";
import Register from "../register";
import CreateEvent from "../createEvent";
import Footer from "../../components/molecules/footer";
import ChatWindow from "../../components/molecules/chatWindow";
import ResetPassword from "../resetPassword";
import TermsOfService from "../tos";
import About from "../aboutUs";
import Me from "../me";

function MainApp() {
  const [search, setSearch] = useState("");
  return (
    <div className="main-app wrapper">
      <div className="content-wrapper">
        <Switch>
          <Route path="/aboutus">
            <Header search={(data) => setSearch(data)} />
            <About />
            <Footer />
          </Route>
          <Route path="/termsofservice">
            <Header search={(data) => setSearch(data)} />

            <TermsOfService />
            <Footer />
          </Route>
          <Route path="/saved-event">
            <Header search={(data) => setSearch(data)} />

            <SavedEvent />
            <Footer />
          </Route>
          <Route path="/create-event">
            <Header search={(data) => setSearch(data)} />

            <CreateEvent />
            <Footer />
          </Route>
          <Route path="/myevent">
            <Header search={(data) => setSearch(data)} />

            <MyEvent />
            <Footer />
          </Route>
          <Route path="/item-detail/:id">
            <Header search={(data) => setSearch(data)} />

            <ItemDetail />
            <Footer />
          </Route>
          <Route path="/edit/:id">
            <Header search={(data) => setSearch(data)} />

            <UpdateEvent />
            <Footer />
          </Route>
          <Route exact path="/me">
            <Header search={(data) => setSearch(data)} />

            <Me />
            <Footer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/resetpassword">
            <ResetPassword />
          </Route>
          <Route exact path="/">
            <Header search={(data) => setSearch(data)} />

            <Home search={search} />
            <Footer />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default MainApp;
