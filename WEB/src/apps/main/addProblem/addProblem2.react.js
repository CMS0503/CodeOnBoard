
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Tab from './components/Tab';
import Ending from './components/endingCheckbox';
import SiteWrapper from "../SiteWrapper.react";
import { Page } from "tabler-react";
import "../../../../node_modules/tabler-react/dist/Tabler.css"
import "../Home.css"

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	}
}));


function Courses(props) {


	const classes = useStyles(props);
	var header = {
		'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
	}


	

	
		
	return(
		<SiteWrapper>
		{/* <Page.Content> */}
		<div className="ml-9 flex flex-col flex-auto flex-shrink-0 w-full">
			<div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-8 sm:px-16 py-12">
			<Card className="mw">
				<div>
				<Divider/>
				{
						(() => {
							return <Tab></Tab>
						})()
				}

				</div>
				<div>
				<Typography className="text-20 sm:text-40 font-light" color="textPrimary" gutterBottom>
				엔딩 정보 입력하기
				</Typography>
				<Divider/>
				{
					<Ending/>
				}
				</div>
			</Card>


			</div>
			<div className="mx-auto sm:px-256">
				<Button
					className="ml-9 mt-4"
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						paddingLeft: 40,
						paddingRight: 40,
						marginBottom: 24,
						height: 40
					}}
					variant="contained"
					color="primary"
					href ="/addProblem3/"
					>		
					NEXT
     			</Button>
			</div>
		</div>
		{/* </Page.Content> */}
		</SiteWrapper>
	);
}

export default Courses;
