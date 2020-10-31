import * as React from "react";
import {Form, Grid} from "tabler-react";
import * as ReactBootstrap from 'react-bootstrap';
import "../../Home.css"
import * as Action from "../../../store/actions/addProblem.action"
import { useDispatch, useSelector } from "react-redux";
import {useState} from "react";

function ProblemInfo(){
    const dispatch = useDispatch();
    const {initBoard, problemName, limitTime, limitMemory} = useSelector(state =>({
        problemName:state.addProblem.problemName,
        initBoard: state.addProblem.initBoard,
        limitTime: state.addProblem.limitTime,
        limitMemory: state.addProblem.limitMemory,
    }))
    const handleFileInput = (e) => {
		dispatch(Action.setDesc(e.target.files[0]))
	}

	const handleFileInput2 = (e) => {
		dispatch(Action.setThumbnail(e.target.files[0]))
	}

    return(
        <React.Fragment>
            <Grid.Row>
                <Grid.Col>
            <Form.Group label="문제 이름">
                <Form.Input 
                    placeholder="문제 이름"
                    className="input"
                    value={problemName}
                    onChange={(e)=>dispatch(Action.setProblemName(e.target.value))}
                />
            </Form.Group>
            <Form.Group label="제한 시간">
                <Form.Input
                    value={limitTime}
                    className="input"
                    onChange={(e)=>dispatch(Action.setLimitTime(e.target.value))}
                />
            </Form.Group>
            <Form.Group label="제한 메모리">
                <Form.Input
                    value={limitMemory}
                    className="input"
                    onChange={(e)=>dispatch(Action.setLimitMemory(e.target.value))}
                />
            </Form.Group>
            <Form.Group label="desc">
                <Form.FileInput 
                className="input"
                onChange={handleFileInput}
                />
                
            </Form.Group>
            <Form.Group label="thumbnail">
                <Form.FileInput 
                className="input"
                onChange={handleFileInput2}
                />
            </Form.Group>
                </Grid.Col>
                <Grid.Col>
            <Form.Group label="Init board">
                <Form.Textarea
                className="input-lg"
                rows="8"
                value={initBoard}
                onChange={(e)=>dispatch(Action.setInitBoard(e.target.value))}
                />
            </Form.Group>
                    </Grid.Col>
                </Grid.Row>
        </React.Fragment>
    )
}

export default ProblemInfo;