// @flow

import * as React from "react";
import axios from 'axios';
import { Button, Page, Card, Table, Loader } from "tabler-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SiteWrapper from "./SiteWrapper.react";
import * as Action from "../store/actions/codeList.action";

function Ranking({match}) {
    

    return(
        <SiteWrapper>
            <Page.Content>
                Ranking
            </Page.Content>
        </SiteWrapper>
    )
};

export default Ranking;