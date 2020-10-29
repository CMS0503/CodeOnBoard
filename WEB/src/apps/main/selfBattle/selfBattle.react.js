import React from 'react';
import { IonPhaser } from '@ion-phaser/react'
import Scene1 from './components/Scene1'
import Scene2 from './components/Scene2'
import Scene3 from './components/Scene3'
import Scene4 from './components/Scene4'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "tabler-react";

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;

    return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        // width: 400,
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function SelfBattle(props){
    // temp game_id edit here!!!!!!!!!!!!!!!!!!!!!!!!!!
    window.localStorage.setItem("codeId", props.codeId);
    window.localStorage.setItem("problemId", props.problemId);
    // window.localStorage.setItem('game_id', 1959);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [game, setGame] = React.useState({
        width: 1050,
        height: 700,
        backgroundColor: 0x192d3f,
        scene: [Scene1, Scene2],
        pixelArt: true,
    })
    
    const handleOpen = () => {
        window.sessionStorage.setItem('SS_sceneLife', true);
        console.log(props.problemId);
        console.log(props.codeId);
        if(props.problemId === 3){
            setGame({
                width: 1050,
                height: 700,
                backgroundColor: 0x192d3f,
                scene: [Scene3, Scene4],
                pixelArt: true,
            })
        } else{
            setGame({
                width: 1050,
                height: 700,
                backgroundColor: 0x192d3f,
                scene: [Scene2],
                pixelArt: true,
            })
        }
        console.log(game)
        // window.localStorage.setItem('game_id', 1959);
        setOpen(true);
    };
    
    const handleClose = () => {
        console.log("close");
        // window.sessionStorage.setItem('SS_sceneLife', false);
        // window.localStorage.removeItem('game_id')
        setOpen(false);
    };

    return(
        <div>
        {props.available===true?<Button color="primary" onClick={handleOpen}>대전</Button>:<Button color="primary" disabled>대전</Button>}
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <div style={modalStyle} className={classes.paper}>
                <IonPhaser game={game}/>
            </div>
        </Modal>
        </div>
    );
}


export default SelfBattle;
