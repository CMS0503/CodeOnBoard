// @flow

import * as React from "react";
import axios from 'axios';
import { Button, Page, Card, Table } from "tabler-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SiteWrapper from "../../main/SiteWrapper.react"
import ProblemNav from "../../main/problemNav.react"
import * as Action from "../../store/actions/replay.action";
import "../../../../node_modules/tabler-react/dist/Tabler.css"
import "../Home.css"
import ViewReplayPage from "./viewReplayPage"
import * as api from "../../api/api.react"
import problem from "../../store/reducers/problem.reducer";


function Replay( {match} ) {
    const dispatch = useDispatch()
    const { userId, replayList, isOpen, selectedGameId, problemId } = useSelector(state => ({
        userId : state.auth.pk,
        replayList:state.replay.replayList,
        isOpen:state.replay.isOpen,
        selectedGameId:state.replay.gameId,
        problemId:state.problem.id
        }))

    function getWinner(_challenger, _opposite, _winner){
        var winnerId = null
        if(_winner === "challenger"){
            winnerId = _challenger
        }
        else if(_winner === "opposite"){
            winnerId = _opposite
        }
        if(userId === winnerId){
            return <Table.Col className="resultWin">Win</Table.Col>
        }
        else{
            return <Table.Col className="resultLose">Lose</Table.Col>
        }
    }

    React.useEffect(() =>{
        api.getGames(problemId)
        .then(response =>{
            const data = response.data;
            console.log(data)
            dispatch(Action.setReplayList(data))
        })
    },[])
    console.log('problemId', problemId)
    return(
        <SiteWrapper>
            <Page.Content>
                <ProblemNav id={problemId} />
                    <Card className="mt-4">
                        <Table>
                            <Table.Header className="th">
                            <tr>
                                <Table.ColHeader className="cth">문제</Table.ColHeader>
                                <Table.ColHeader className="cth">대전 상대</Table.ColHeader>
                                <Table.ColHeader className="cth">대전 날짜</Table.ColHeader>
                                <Table.ColHeader className="cth">결과</Table.ColHeader>
                                <Table.ColHeader className="cth">리플레이 보기</Table.ColHeader>
                            </tr>
                            </Table.Header>
                            <Table.Body>
                                {replayList.map(replay => {
                                    return(
                                        <Table.Row key={replay.id}>
                                            <Table.Col className="tb">
                                                {`${replay.title}(${replay.id})`}
                                            </Table.Col>
                                            <Table.Col className="tb">
                                                {`${replay.opposite_name}`}
                                            </Table.Col>
                                            <Table.Col className="tb">
                                            {`${replay.date.split('T')[0]} ${replay.date.split('T')[1].split('.')[0]}`}
                                            </Table.Col>
                                                {getWinner(replay.challenger, replay.opposite, replay.winner)}
                                            <Table.Col className="tb">
                                                <ViewReplayPage tmp_id={replay.id}/>
                                            </Table.Col>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    </Card>
            </Page.Content>
        </SiteWrapper>
    )
};

export default Replay;