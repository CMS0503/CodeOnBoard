// @flow

import * as React from "react";
import axios from 'axios';
import { Button, Page } from "tabler-react";
import { useSelector } from "react-redux"
import Modal from '@material-ui/core/Modal';
import SiteWrapper from "./SiteWrapper.react";
import ProblemNav from "./problemNav.react"

function Matchlog({match}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return(
        <SiteWrapper>
            <Page.Content>
                <ProblemNav id={match.params.id} />
                    <h1> {window.localStorage.getItem("change")} </h1>
                    <img src="../../../images/webGL/board.jpg" alt={"logo"}/> 
            </Page.Content>
        </SiteWrapper>
    )
};

export default Matchlog;