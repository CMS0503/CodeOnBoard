// @flow

import * as React from "react";
import axios from 'axios';
import { Card, Page, Grid, Avatar, Text, GalleryCard, Dropdown, Button } from "tabler-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SiteWrapper from "../../main/SiteWrapper.react"
import ProblemNav from "../../main/problemNav.react"
import * as Action from "../../store/actions/match.action"
import * as pAction from "../../store/actions/problem.action"
import { call, delay } from 'redux-saga/effects'
import "../../../../node_modules/tabler-react/dist/Tabler.css"
import * as api from "../../api/api.react"
import "../Home.css"

function Match({match}) {
    const dispatch = useDispatch();
    const problemId = document.location.href.split("match/")[1]

    // const userId = window.localStorage.getItem("userId")
    const userId = 2
    var challengerInfo = {}
    var challengerInfoInProblem = {}
    var oppositeInfo = {}
    var oppositeInfoInProblem = {}
    var problem = {}
    

    const { 
        tier, 
        score, 
        language, 
        thumbnail, 
        codeList, 
        code, 
        isMatching, 
        gameStatus,
        gameId, 
        tier2, 
        score2, 
        language2,
        
    } = useSelector(
        state => ({
            tier: state.match.tier,
            score: state.match.score,
            language: state.match.language,
            thumbnail: state.match.thumbnail,
            codeList: state.match.codeList,
            code: state.match.code,
            isMatching: state.match.isMatching,
            gameStatus: state.match.gameStatus,
            gameId: state.match.gameId,
            tier2: state.match.tier2,
            user2: state.match.tier2,
            score2: state.match.score2,
            language2: state.match.language2,

        }),
        shallowEqual
      );
    
    const { title } = useSelector(state => ({
        title:state.problem.title
    }))
    var loader = <Text className="mb-4 strong">{gameStatus}</Text>
    
    function getProblem(problemId){
        api.getProblem(problemId)
        .then(response =>{
            problem = response.data
            dispatch(Action.setThumbnail(problem.thumbnail))
            dispatch(pAction.setTitle(response.data.title))
        })
        .catch( () =>{

        })
    }

    function getUserInfo(type, userId){
        console.log(`==> getUserinfo ${type}`, userId)
        api.getUserInfo(userId)
        .then(response => {
        //    getUserTier(userid,problemid,type,response.data.username, language);
            
            challengerInfo = response.data.userInfo
            dispatch(Action.setLanguage(challengerInfo.language))
        

        })
        .catch(error => {
           // console.log(error);
        })
  
    }

    function getCodeList(userId, problemId){
        console.log("==> getcodelist");
        api.getCodeList(userId, problemId)
        .then(response => {
            dispatch(Action.setCodeList(response.data.results))
            console.log(Object.keys(codeList).length);
        })
    }

    function matching(userId, problemId, codeId){
        console.log("===> matching");
        if (isMatching){
           return;
        }

        const data = {
            'userid': userId,
            'problemid': problemId,
            'codeid': codeId
        }

        api.matching(data)
        .then(response => {
            
            const data = response.data;
            console.log("Matching >>", data.opposite_language);
            dispatch(Action.setLanguage2(data.opposite_language));
            getUserInfo("opposite", data.opposite);

            dispatch(Action.setGameId(data.match_id));
            dispatch(Action.setIsMatching(true));
            dispatch(Action.setGameStatus('게임중...'));
                
        })
        .catch(error => {
           dispatch(Action.setGameStatus(`매칭 에러(${error})`));
        })
     }
    
    React.useEffect(() => {
        getUserInfo("challenger", userId);
        getProblem(problemId)
        getCodeList(userId, problemId)
     },[]);

    React.useEffect(() => {
        if(isMatching){
        const repeat = setInterval(() => {
            api.getGame(gameId)
            .then(response => {
               const result = response.data.result;
               // console.log(result);
               
               if (result !== "playing"){

                const winner = response.data.winner;

                if (winner === "challenger"){
                    dispatch(Action.setGameResult('Win'));
                    dispatch(Action.setGameResult2('Lose'));
                    dispatch(Action.setGameStatus('게임 종료!'));
                }
                else if (winner === "opposite"){
                    dispatch(Action.setGameResult('Lose'));
                    dispatch(Action.setGameResult2('Win'));
                    dispatch(Action.setGameStatus('게임 종료!'));
                }
                else{
                    dispatch(Action.setGameStatus('Error'));
                }

                clearInterval(repeat);         
               }

            })
            .catch(error => {
                clearInterval(repeat);
            })
         },2000);
        }
    }, [isMatching])
    


    return(
        <SiteWrapper>
            <Page.Content>
                <ProblemNav id={match.params.id} />
                    <Grid.Row>
                        <Grid.Col>
                            <Card xl={4} className="mt-8 modal-dialog-centered" title="user 1">
                                <Avatar className= "mt-2" icon="users" size="xxl"/>
                                <Text className="mt-1 " size="h2">User1</Text>
                                <Text className="mt-1" size="h4">Language : {language}</Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col>
                            <Card xl={4} className="modal-dialog-centered p-card">
                                <Text className="mt-1" size="h2">{title}</Text>
                                <GalleryCard className="p-0">
                                    <GalleryCard.Image
                                        src={thumbnail}>       
                                    </GalleryCard.Image>
                                </GalleryCard>
                                {loader}      
                                <Dropdown
                                    type="button"
                                    toggle={false}
                                    color="primary"
                                    triggerContent={code.name.slice(0, 30)}
                                    itemsObject={[
                                        { 
                                            value:Object.keys(codeList).length>0?codeList[Object.keys(codeList).length-1].name:"" ,
                                            onClick:()=>{dispatch(Action.setCode(codeList[Object.keys(codeList).length-1]))}
                                        },
                                        { isDivider: true },
                                        { 
                                            value: Object.keys(codeList).length>0?codeList[Object.keys(codeList).length-2].name:"" ,
                                            onClick:()=>{dispatch(Action.setCode(codeList[Object.keys(codeList).length-2]))}
                                        },
                                        { isDivider: true },
                                        { 
                                            value: Object.keys(codeList).length>0?codeList[Object.keys(codeList).length-3].name:"" ,
                                            onClick:()=>{dispatch(Action.setCode(codeList[Object.keys(codeList).length-3]))}
                                        },
                                    ]}>
                                </Dropdown>
                                <Button className="mt-5 mb-3" onClick={function(){
                                    matching(userId, problemId, code.id)}}
                                    >매칭 시작</Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col>
                            <Card xl={4} className="mt-8 modal-dialog-centered" title="user 2">
                                <Avatar className= "mt-2" icon="users" size="xxl"/>
                                <Text className="mt-1" size="h2">user2</Text>
                                <Text className="mt-1" size="h4">Language : {language2}</Text>
                            </Card>
                        </Grid.Col>
                    </Grid.Row>
            </Page.Content>
        </SiteWrapper>
    )
};

export default Match;