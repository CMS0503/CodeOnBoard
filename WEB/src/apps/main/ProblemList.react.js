// @flow

import * as React from "react";
import axios from 'axios';
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Page, Grid, GalleryCard } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react"; 
import * as api from "../api/api.react";
import * as Action from "../store/actions/problem.action"

function ProblemList() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
    console.log("====> userEffect")
		api.getProblems()
		.then(response => {
			setPosts(response.data.results);
    })
    .catch(error => {
      console.log(error);
    })
  },[dispatch]);

  return(
  <SiteWrapper>
    {console.log("=====> render")}
    <Page.Content>
      {/* {console.log("==>",posts)} */}
      <Grid.Row className="row-cards">
      {posts.map((problem) =>(
        <Grid.Col lg={3}>
          <GalleryCard className='p-0' >
            <a href="!#" onClick = {() => {
              dispatch(Action.setId(problem.id));
            }}>
              <GalleryCard.Image
                className='mb-0'
                src={problem.thumbnail}
                href={"problem/" + problem.id}
              />
            </a>
          </GalleryCard>        
        </Grid.Col>
      ))}
      </Grid.Row>
    </Page.Content>
  </SiteWrapper>
  
  
  )
  }
export default ProblemList;
