// @flow

import * as React from "react";
import axios from 'axios';
import { Button, Page, Card, Table, Loader } from "tabler-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SiteWrapper from "../SiteWrapper.react"
import ProblemNav from "../problemNav.react"
import * as Action from "../../store/actions/rankingProblem.action";

function RankingProblem({match}) {
    const dispatch = useDispatch()
    const problemId = document.location.href.split("rankingProblem/")[1]
    const { userList } = useSelector(state => ({ 
        userList: state.rankingProblem.userList,
    }))
    
    var _list = userList!==null?
        <Table.Body>{userList.map((user, index) => {
            return(
            <Table.Row key={user.user}>
                <Table.Col className="tb">
                    {index+1}
                </Table.Col>
                <Table.Col className="tb">
                    {user.tier}
                </Table.Col>
                <Table.Col className="tb">
                    {user.username}
                </Table.Col>
                <Table.Col className="tb">
                    {user.score}
                </Table.Col>
            </Table.Row>
            )
        })}
        </Table.Body>
        :<tbody></tbody>

    React.useEffect(()=>{
        axios.get(`http://203.246.112.32:8000/api/v1/rank/?problem=${problemId}`)
          .then((response)=>{
            dispatch(Action.setRanking(response.data))
            console.log(response.data);
          })
          .catch((error)=>{
            console.log(error);
          });
    },[]);

    return(
        <SiteWrapper>
            <Page.Content>
                <ProblemNav id={match.params.id} />
                    <Card className="mt-4">
                        <Table>
                            <Table.Header className="th">
                                <tr>
                                <Table.ColHeader className="cth">순위</Table.ColHeader>
                                <Table.ColHeader className="cth">티어</Table.ColHeader>
                                <Table.ColHeader className="cth">이름</Table.ColHeader>
                                <Table.ColHeader className="cth">점수</Table.ColHeader>
                                </tr>
                            </Table.Header>
                            {_list}
                        </Table>
                    </Card>
            </Page.Content>
        </SiteWrapper>
    )
};

export default RankingProblem;