import * as React from "react";
import {Form} from "tabler-react";
import "../../Home.css"
import * as Action from "../../../store/actions/addProblem.action"
import { useDispatch, useSelector } from "react-redux";

function ProblemInfo(){
    const dispatch = useDispatch();
    const {thumbnail} = useSelector(state => ({
        thumbnail:state.addProblem.thumbnail,
    }))
    return(
        <React.Fragment>
            <Form.Group label="문제 이름">
                <Form.Input 
                    placeholder="문제 이름"
                    className="input"
                    onChange={(e)=>dispatch(Action.setProblemName(e.target.value))}
                />
            </Form.Group>
            <Form.Group label="제한 시간">
                <Form.Input
                    placeholder="0(ms)"
                    className="input"
                    onChange={(e)=>dispatch(Action.setLimitTime(e.target.value))}
                />
            </Form.Group>
            <Form.Group label="제한 메모리">
                <Form.Input
                    placeholder="0"
                    className="input"
                    onChange={(e)=>dispatch(Action.setLimitMemory(e.target.value))}
                />
            </Form.Group>
            <Form.Group label="desc">
                <Form.FileInput 
                className="input"
                onChange={(e)=>dispatch(Action.setDesc(e.target.files[0]))}
                />
                
            </Form.Group>
            <Form.Group label="thumbnail">
                <Form.FileInput 
                className="input"
                file={thumbnail}
                onChange={(e)=>dispatch(Action.setThumbnail(e.target.files[0]))}
                />
            </Form.Group>
        </React.Fragment>
    )
}

export default ProblemInfo;