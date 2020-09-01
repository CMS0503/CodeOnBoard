// @flow

import * as React from "react";
import { Nav, Page, Button} from "tabler-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SiteWrapper from "../SiteWrapper.react";
import * as Action from "../../store/actions/addProblem.action"
import Stone from "./components/stone.react"
import ProblemInfo from "./components/problemInfo.react"

function AddProblem({match}) {
    const dispatch = useDispatch();
    
    const { selectedStone } = useSelector(state => ({
        selectedStone: state.addProblem.selectedStone
    }))
    

    return(
        <SiteWrapper>
            <Page.Content>
                <ProblemInfo ></ProblemInfo>
                <Nav>
                    <Nav.Item onClick={()=>dispatch(Action.selectStone(0))}> 1번 돌</Nav.Item>
                    <Nav.Item onClick={()=>dispatch(Action.selectStone(1))}> 2번 돌</Nav.Item>
                    <Nav.Item onClick={()=>dispatch(Action.selectStone(2))}> 3번 돌</Nav.Item>
                    <Nav.Item onClick={()=>dispatch(Action.selectStone(3))}> 4번 돌</Nav.Item>
                </Nav>
                <Stone selectedStone={selectedStone}></Stone>
                {/* <Button className="mt-5">문제 만들기</Button> */}
            </Page.Content>
            
        </SiteWrapper>
    )
};

export default AddProblem;
