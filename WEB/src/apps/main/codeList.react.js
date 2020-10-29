// @flow

import * as React from "react";
import axios from 'axios';
import { Button, Page, Card, Table, Loader } from "tabler-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SiteWrapper from "./SiteWrapper.react";
import ProblemNav from "./problemNav.react"
import SelfBattle from "./selfBattle/selfBattle.react"
import * as Action from "../store/actions/problem.action"
import * as api from "../api/api.react"

function CodeList({match}) {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userInfo")
        ?JSON.parse(localStorage.getItem("userInfo")).pk:null
    const languageList2 = {1: "Python", 2: "C", 3: "C++"}
    const { codeList, problemId, codeId } = useSelector(state => ({
        codeList: state.problem.codeList,
        problemId: state.problem.id,
        codeId: state.problem.codeId
    }))

    const url = "/problem/" + problemId
    var _list = codeList!==null?
        <Table.Body>{codeList.map(code => {
            return(
            <Table.Row key={code.id}>
                <Table.Col className="tb">
                    {`${code.name}`}
                </Table.Col>
                <Table.Col className="tb">
                    {`${code.date.split('T')[0]} ${code.date.split('T')[1].split('.')[0]}`}
                </Table.Col>
                <Table.Col className="tb">
                    {languageList2[code.language]}
                </Table.Col>
                <Table.Col className="tb">
                    {code.available_game===true?`가능`:`불가능`}
                </Table.Col>
                <Table.Col className="tb">
                    <Button color="primary" RootComponent="a" href={url} onClick={()=>{
                        dispatch(Action.setCodeId(code.id))
                        dispatch(Action.setLanguage(code.language))
                    }}>수정
                    </Button>
                </Table.Col>
                <Table.Col className="tb">
                    <Button color="primary" onClick={()=>{
                        api.deleteCode(code.id)
                        .then(response =>{
                            alert("삭제 완료")
                            window.location.reload(false);
                        })
                        .catch( () =>{
                        })
                    }}>삭제
                    </Button>
                </Table.Col>
                <Table.Col className="tb">
                    <SelfBattle available={code.available_game} problemId={problemId} codeId={code.id}/>
                </Table.Col>
            </Table.Row>
            )
        })}
        </Table.Body>
        :<tbody></tbody>
    
    
    function getCodeList(){
        console.log("==> getcodelist");
        api.getCodeList(userId, problemId)
        .then(response => {
            console.log("res >> ", response)
            dispatch(Action.setCodeList(response.data))
            // console.log(Object.keys(codeList).length);
            console.log(codeList)
    
        })
    }

    React.useEffect(() => {
        getCodeList()
    },[])

    return(
        <SiteWrapper>
            <Page.Content>
                <ProblemNav id={problemId} />
                    <Card className="mt-4">
                        <Table>
                            <Table.Header className="th">
                                <tr>
                                <Table.ColHeader className="cth">이름</Table.ColHeader>
                                <Table.ColHeader className="cth">제출 날짜</Table.ColHeader>
                                <Table.ColHeader className="cth">언어</Table.ColHeader>
                                <Table.ColHeader className="cth">게임 가능 여부</Table.ColHeader>
                                <Table.ColHeader className="cth">수정</Table.ColHeader>
                                <Table.ColHeader className="cth">삭제</Table.ColHeader>
                                <Table.ColHeader className="cth">코드와 대전하기</Table.ColHeader>
                                </tr>
                            </Table.Header>
                            {_list}
                        </Table>
                    </Card>
            </Page.Content>
        </SiteWrapper>
    )
};

export default CodeList;