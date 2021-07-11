import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
      <Footer /> 
    </Router>
  );
};

export default App;
