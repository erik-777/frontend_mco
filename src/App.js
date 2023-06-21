import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Main>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/edit/:id" component={Edit} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
