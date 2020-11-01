// @flow

import * as React from "react";
import axios from 'axios';
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Page, Grid, GalleryCard, Button, Text } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react"; 
import * as api from "../api/api.react";
import * as Action from "../store/actions/problem.action"
import * as Action2 from "../store/actions/addProblem.action"

function ProblemList() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")).pk:undefined

  React.useEffect(() => {
    console.log("====> userEffect")
		api.getProblems(false)
		.then(response => {
			setPosts(response.data.results);
    })
    .catch(error => {
      console.log(error);
    })
  },[dispatch]);

  function handlerEdit(id, mode){
    dispatch(Action.setId(id))
    dispatch(Action2.setMode(mode))
  }

  function handlerDelete(id){
    api.deleteProblem(id)
        .then(res=>{
          alert("삭제 완료")
          window.location.reload(false);
        })
  }
  function EditButton(props){
    if(userId === 1){
      console.log("id", props.id)
      return <Grid>
        <Grid.Row className='mb-4 mt-0'>
      <Grid.Col>
                <Button color='primary'
                     onClick={()=>handlerEdit(props.id, props.mode)}
                     RootComponent="a" href="/addproblem">수정{props.id}
                </Button>
        </Grid.Col>
        <Grid.Col>
          <Button color='red' onClick={()=>handlerDelete(props.id)}>삭제</Button>
        </Grid.Col>
          </Grid.Row>
            </Grid>
    }
    else{
      return null
    }
  }

  return(
  <SiteWrapper>
    {console.log("=====> render")}
    <Page.Content>
      {/* {console.log("==>",posts)} */}
      <Grid.Row className="row-cards">
      {posts.map((problem) =>(
        <Grid.Col lg={3}>
          <GalleryCard className='p-0 mb-1' >
            <a href="!#" onClick = {() => {
              dispatch(Action.setId(problem.id));
            }}>
              <GalleryCard.Image
                className='mb-0'
                src={problem.thumbnail}
                href={"problem/" + problem.id}
              />
            </a>
            <GalleryCard.Footer>
                  <GalleryCard.Details
                    fullName={problem.title}
                  />
                </GalleryCard.Footer>
          </GalleryCard>

          <EditButton id={problem.id} mode="patch"/>
        </Grid.Col>
      ))}
      </Grid.Row>
    </Page.Content>
  </SiteWrapper>
  
  
  )
  }
export default ProblemList;
