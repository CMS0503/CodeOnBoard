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


function Replay( {match} ) {
    const dispatch = useDispatch()
    const userId = 2
    // const problemId = document.location.href.split("replay/")[1]
    const problemId = 1
    const { replayList, isOpen, selectedGameId } = useSelector(state => ({
        replayList:state.replay.replayList,
        isOpen:state.replay.isOpen,
        selectedGameId:state.replay.gameId
        }))

    const header = {
        'Authorization' : 'jwt ' + window.localStorage.getItem('jwt')
        }

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

    function getScore(_challenger, _opposite, _challengerScore, _oppositeScore){
        var score = null;
        if(userId === _challenger){
            score = _challengerScore;
        }
        else{
            score = _oppositeScore;
        }
        return score
    }

    function getScoreFlu(_challenger, _opposite, _challengerScoreFlu, _oppositeScoreFlu){
        var scoreFlu = null;
        if(userId === _challenger){
            scoreFlu = _challengerScoreFlu;
        }
        else{
            scoreFlu = _oppositeScoreFlu;
        }
        return scoreFlu
    }

    React.useEffect(() =>{
        axios.get(`http://203.246.112.32:8000/api/v1/game/my`, {headers: header})
        .then(response =>{
            const data = response.data;
            dispatch(Action.setReplayList(data))
        })
    },[])

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
                                <Table.ColHeader className="cth">점수</Table.ColHeader>
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
                                            <Table.Col className="tb">
                                                {`${getScore(replay.challenger, replay.opposite, replay.challenger_score, replay.opposite_score)}
                                                (${getScoreFlu(replay.challenger, replay.opposite, replay.challenger_score_flu, replay.opposite_score_flu)})`}
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