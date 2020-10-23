import { UnControlled as CodeMirror } from 'react-codemirror2';
import * as React from "react";
import './CodeMirror.css';
import "./CodeEditor.css";
import { Grid, Button, Dropdown } from 'tabler-react';
import axios from "axios";
import * as Action from "../../../store/actions/problem.action"
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "../../../../../node_modules/codemirror/theme/material.css";
import * as api from "../../../api.react";

var header = {
  'Authorization' : 'jwt ' + window.localStorage.getItem('jwt')
}

require('codemirror/theme/neat.css');
require('codemirror/mode/python/python.js');
require('codemirror/mode/clike/clike.js');


function CodeEditor(props)  {
    const dispatch = useDispatch();
    const problemId = document.location.href.split("problem/")[1]
    const userId = localStorage.getItem("pk")
    const mode = props.mode;
    const { code, codeName, language, editor } = useSelector(
      state => ({
        code: state.problem.code,
        codeName: state.problem.codeName,
        language: state.problem.language,
        editor: state.problem.editor,
      }),
      shallowEqual
    );
    const languageList = {"Python": 1, "C": 2, "C++": 3}
    const languageList2 = {1: "Python", 2: "C", 3: "C++"}
    
    const button = <Button onClick={codePost}>제출</Button>

    function codePost(){
      var data = {
        author: userId,
        code : code,
        language : languageList[language],
        problem: problemId,
        name : codeName
      }
      console.log("Post data==>", data)
      api.postCode(data)
      .then(response =>{
        dispatch(Action.submit(true))
        window.scrollTo(0, 0)
      })
      .catch(error => {
        alert("제출 실패")
      })
    }

    React.useEffect(() =>{
      if(window.localStorage.getItem("codeMode") === "update"){
          api.getCode(window.localStorage.getItem('selectedCodeId'))
          .then((response) => {
            console.log("data==>",response.data)
            dispatch(Action.writeCode(response.data.code));
            dispatch(Action.setLanguage(languageList2[response.data.language]));
            dispatch(Action.writeCodeName(response.data.name));
          })
          .catch((error) => {
            console.log(error);
          })
      }
      else{

      }
    },[])

    return(
        <React.Fragment >
          <Grid.Row justifyContent="center " >
            {/* <Grid.Col className="offsetSelect">
            
              <select value={languageId} padding-bottom="10px" 
              onChange={(e) => {
                dispatch(Action.setLanguage(e.target.value))
              }}>
                <option value="" selected disabled>Language</option>
                <option value={1}>Python</option>
                <option value={2}>C</option>
                <option value={3}>C++</option>
              </select>
            </Grid.Col> */}
            <Grid.Col className="pt-2">
              <CodeMirror
              className="editor"
              autoCursor={false}
              value={code}
              options={{
                mode: "python",
                theme: "material",
                lineNumbers: true
              }}
              onChange={(editor, data, value) => {
                dispatch(Action.writeCode(value));
              }}
              />
            </Grid.Col>
            <Grid.Row className="pt-2">
            <Grid.Col className="pt-2">
                <Dropdown
                  type="button"
                  toggle={false}
                  color="primary"
                  triggerContent={language}
                  itemsObject={[
                      {
                        value: "Python",
                        onClick:()=>{
                          dispatch(Action.setLanguage("Python"))
                          dispatch(Action.setEditor("python"))
                        }
                      },
                      { isDivider: true },
                      { 
                        value: "C",
                        onClick:()=>{
                          dispatch(Action.setLanguage("C"))
                          dispatch(Action.setEditor("clike"))
                        }   
                      },
                      { isDivider: true },
                      { 
                        value: "C++",
                        onClick:()=>{
                          dispatch(Action.setLanguage("C++"))
                          dispatch(Action.setEditor("clike"))
                        } 
                      },
                  ]}>
                </Dropdown>
              </Grid.Col>
              <Grid.Col>
                <textarea 
                  placeholder="Code Name" 
                  value={codeName} 
                  onChange={(e) => {
                  dispatch(Action.writeCodeName(e.target.value));
                }}/>
              </Grid.Col>
              <Grid.Col className="pt-2">
                {button}
              </Grid.Col>
            </Grid.Row>
          </Grid.Row>
        </React.Fragment>   
    )
}

export default CodeEditor;