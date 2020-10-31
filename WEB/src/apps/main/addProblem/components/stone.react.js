import * as React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as Action from "../../../store/actions/addProblem.action"
import { Text, Grid, Button} from "tabler-react";
import "../../Home.css"
import axios from 'axios';
import * as api from '../../../api/api.react'
import { Form } from "react-bootstrap";

function Stone(props){
    const dispatch = useDispatch();
    const userId = JSON.parse(localStorage.getItem("userInfo")).pk
    const { mode, problemName, limitTime, limitMemory, initBoard, desc, thumbnail, placementRule,
        placementRuleList, actionRuleList,selectedStone, rules, problemId }
    = useSelector(
        state => ({
            mode:state.addProblem.mode,
            problemName:state.addProblem.problemName,
            limitTime:state.addProblem.limitTime,
            limitMemory:state.addProblem.limitMemory,
            initBoard:state.addProblem.initBoard,
            desc:state.addProblem.desc,
            thumbnail:state.addProblem.thumbnail,
            selectedStone: state.addProblem.selectedStone,
            placementRuleList:state.addProblem.placementRuleList,
            actionRuleList:state.addProblem.actionRuleList,
            rules:state.addProblem.rules,
            problemId:state.problem.id
    }));

    React.useEffect(() => {
        api.getPlacementRuleList()
            .then(response => {
                console.log('PR >>',response.data)
                dispatch(Action.setPlacementRuleList(response.data.results))
            })
            .catch(error => {
                console.log('getPlacementRuleList error', error)
            })
        api.getActionRuleList()
            .then(response => {
                console.log('AR >>',response.data.results)
                dispatch(Action.setActionRuleList(response.data.results))
            })
            .catch(error => {
                console.log('getActionRuleList error', error)
            })
     },[]);


    function ex(){
        var frm = new FormData();
        frm.append("editor", 1);
        frm.append("title", "asd");
        for (var pair of frm.entries()){
			console.log(pair[0] + ',' + pair[1], pair);
		}
    }

    function problemPost(){
		let frm = new FormData();

		frm.append("editor", userId);
		frm.append("title", problemName);
		frm.append("description", desc);
		frm.append("limit_time", limitTime);
		frm.append("limit_memory", limitMemory);
		frm.append("thumbnail", thumbnail);
		frm.append("board_info", initBoard);
		frm.append("rule",JSON.stringify(rules));

		for (var pair of frm.entries()){
			console.log(pair[0] + ': ' + pair[1]);
		}

		api.postProblem(frm)
		.then( response => {
			alert("문제가 생성되었습니다.");
			console.log(response);
		})
		.catch(error => {
			alert(error);
			console.log(error);
		})
    }

    function problemPatch(){
        let frm = new FormData();

		frm.append("editor", userId);
		frm.append("title", problemName);
		frm.append("description", desc);
		frm.append("limit_time", limitTime);
		frm.append("limit_memory", limitMemory);
		frm.append("thumbnail", thumbnail);
		frm.append("board_info", initBoard);
		frm.append("board_size", '8');
		frm.append("rule",JSON.stringify(rules));

		for (var pair of frm.entries()){
			console.log(pair[0] + ': ' + pair[1]);
		}

		api.patchProblem(frm, problemId)
		.then( response => {
		    debugger
			alert("문제가 수정되었습니다.");
			console.log(response);
		})
		.catch(error => {
			alert(error);
			console.log(error);
		})
    }

    const handleSelectType = (e) => {
        dispatch(Action.setStoneType(selectedStone, e.target.value))
    }
    const handleSelectPR = (e) =>{
        dispatch(Action.selectPlacementRule(selectedStone, e.target.value))
    }

    const handleSelectAR = (e, type) =>{
        console.log("select ", e)
        if(type === "condition") {
            dispatch(Action.selectActionCondition(selectedStone, e.target.value))
        }
        else if(type === "direction"){
            dispatch(Action.selectActionDir(selectedStone, e.target.value))
        }
        else if(type === "method"){
            dispatch(Action.selectActionMethod(selectedStone, e.target.value))
        }
    }

    function AddButton(props){
        if(mode === 'patch'){
          return <Button color='primary' onClick={problemPatch}>문제 수정</Button>
        }
        else{
          return <Button color='primary' onClick={problemPost}>문제 만들기</Button>
        }
      }

    return(
        <React.Fragment>
            <Form>
                <Form.Group>
                    <Form.Label>stone type</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={handleSelectType}
                        placeholder='None'
                    >
                        <option>select</option>
                        <option value='add'>Add</option>
                        <option value='move'>Move</option>
                        <option value='add & move'>Add & Move</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>placement rule</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={handleSelectPR}
                        placeholder='None'
                    >
                        <option>select</option>
                        {placementRuleList.map(
                            (rule) => (
                                <option value={rule.rule_number}>{rule.name}</option>
                            )
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>action rule condition</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={(e) => {handleSelectAR(e, "condition")}}
                        placeholder='None'
                    >
                        <option>select</option>
                        {actionRuleList
                            .filter(rule => rule.type1 === "condition")
                            .map((rule) => (
                                <option value={rule.rule_number}>{rule.name}</option>
                            )
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>action rule direction</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={(e) => {handleSelectAR(e, "direction")}}
                        placeholder='None'
                    >
                        <option>select</option>
                        {actionRuleList
                            .filter(rule => rule.type1 === "direction")
                            .map((rule) => (
                                <option value={rule.rule_number}>{rule.name}</option>
                            )
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>action rule method</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={(e) => {handleSelectAR(e, "method")}}
                        placeholder='None'
                    >
                        <option>select</option>
                        {actionRuleList
                            .filter(rule => rule.type1 === "method")
                            .map((rule) => (
                                <option value={rule.rule_number}>{rule.name}</option>
                            )
                        )}
                    </Form.Control>
                </Form.Group>
                <AddButton/>
            </Form>

        </React.Fragment>
    )
    
}

export default Stone;