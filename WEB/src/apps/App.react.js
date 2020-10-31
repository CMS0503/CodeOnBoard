import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./main/Home.react";
import ProblemList from "./main/ProblemList.react"
import ProblemListMy from "./main/problemListMy.react"
import Problem from "./main/problem/Problem.react"
import Replay from "./main/Replay/replay.react" 
import Match from "./main/match/match.react"
import CodeList from "./main/codeList.react"
import Matchlog from "./main/matchlog.react"
import Login from "./authPage/LoginPage"
import Ranking from "./main/ranking.react"
import "tabler-react/dist/Tabler.css";
import RankingProblem from "./main/rankingProblem/rankingProblem.react";
import AddProblem from "./main/addProblem/addProblem.react"
import RegisterPage from "./authPage/RegisterPage.react";

// import test from "./test.js"

function App(props: Props): React.Node {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/problem" component={ProblemList} />
          <Route exact path="/problem-my" component={ProblemListMy} />
          <Route exact path="/problem/:id" component={Problem} />
          <Route exact path="/replay/:id" component={Replay} />
          <Route exact path="/match/:id" component={Match} />
          <Route exact path="/code/my/" component={CodeList} />
          <Route exact path="/matchlog/:id" component={Matchlog} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={Login} />
          {/*<Route exact path="/rankingProblem/:id" component={RankingProblem} />*/}
          {/*<Route exact path="/ranking" component={Ranking} />*/}
          <Route exact path="/addProblem" component={AddProblem} />

        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;

