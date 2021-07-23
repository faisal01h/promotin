import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../../components/molecules";
import "./mainApp.scss";
import Home from "../Home";
import ItemDetail from "../ItemDetail";
import Login from "../Login";
import MyEvent from "../MyEvent";
import SavedEvent from "../SavedEvent";
import Register from "../register";
import CreateEvent from "../createEvent";
import Footer from "../../components/molecules/footer";
import ChatWindow from "../../components/molecules/chatWindow";
import TermsOfService from "../tos";
import About from "../aboutUs";

function MainApp() {
  const [search, setSearch] = useState("");
  return (
    <div className="main-app wrapper">
      <Header search={(data) => setSearch(data)} />

      <div className="content-wrapper">
        <Switch>
          <Route path="/aboutus">
            <About />
          </Route>
          <Route path="/termsofservice">
            <TermsOfService />
          </Route>
          <Route path="/saved-event">
            <SavedEvent />
          </Route>
          <Route path="/create-event">
            <CreateEvent />
          </Route>
          <Route path="/myevent">
            <MyEvent />
          </Route>
          <Route path="/item-detail/:id">
            <ItemDetail />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Home search={search} />
          </Route>
        </Switch>
      </div>
      <ChatWindow />
      <Footer />
    </div>
  );
}

export default MainApp;
