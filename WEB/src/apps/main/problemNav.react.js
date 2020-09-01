import { Nav, Grid } from "tabler-react";
import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";

function ProblemNav(props) {
    // const selectedId = window.localStorage.getItem('userName'); Change "/codes/my" to "/codes/userName"
    
    return(
            <Grid.Row justifyContent="center">
                <Grid.Col auto={true}>
                    <Nav>
                        <Nav.Item LinkComponent={withRouter(NavLink)} value={`${props.id}번`} to={`/problem/${props.id}`} />
                        <Nav.Item LinkComponent={withRouter(NavLink)} to={`/match/${props.id}`}>대전</Nav.Item>
                        <Nav.Item LinkComponent={withRouter(NavLink)} to={`/replay/${props.id}`}>리플레이</Nav.Item>
                        <Nav.Item LinkComponent={withRouter(NavLink)} to={`/code/my/`}>내코드</Nav.Item>  
                        <Nav.Item LinkComponent={withRouter(NavLink)} to={`/matchlog/${props.id}`}>대전현황</Nav.Item>
                        <Nav.Item LinkComponent={withRouter(NavLink)} to={`/rankingProblem/${props.id}`}>랭킹</Nav.Item>
                    </Nav>
                </Grid.Col>
            </Grid.Row>
            
    )
}

export default ProblemNav;