// @flow

import * as React from "react";
import { Nav, Page, Button} from "tabler-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SiteWrapper from "../SiteWrapper.react";
import * as Action from "../../store/actions/addProblem.action"
import * as Action2 from "../../store/actions/problem.action"
import Stone from "./components/stone.react"
import ProblemInfo from "./components/problemInfo.react"
import * as api from "../../api/api.react";

function AddProblem({match}) {
    const dispatch = useDispatch();
    const { problemId, mode } = useSelector(state => ({
        problemId: state.problem.id,
        mode: state.addProblem.mode,
    }))

    React.useEffect(() => {
        if(mode === "patch") {
            api.getProblem(problemId)
                .then(response => {
                    console.log("patch", response.data)
                    dispatch(Action.setLimitTime(response.data.limit_time))
                    dispatch(Action.setProblemName(response.data.title))
                    dispatch(Action.setLimitMemory(response.data.limit_memory))
                })
                .catch(error => {
                    console.log("get patch error")
                })
        }
    },[]);

    return(
        <SiteWrapper>
            <Page.Content>
                <ProblemInfo/>
                <Nav>
                    <Nav.Item onClick={()=>dispatch(Action.selectStone(1))}> 1번 돌</Nav.Item>
                    <Nav.Item onClick={()=>dispatch(Action.selectStone(2))}> 2번 돌</Nav.Item>
                    <Nav.Item onClick={()=>dispatch(Action.selectStone(3))}> 3번 돌</Nav.Item>
                    <Nav.Item onClick={()=>dispatch(Action.selectStone(4))}> 4번 돌</Nav.Item>
                </Nav>
                <Stone />
                {/* <Button className="mt-5">문제 만들기</Button> */}
            </Page.Content>
            
        </SiteWrapper>
    )
};

export default AddProblem;
