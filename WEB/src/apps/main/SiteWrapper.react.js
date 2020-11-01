// @flow

import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";

import {
    Site,
    Nav,
    Grid,
    List,
    Button,
    RouterContextProvider,
} from "tabler-react";

import type { NotificationProps } from "tabler-react";
import { useSelector, useDispatch } from "react-redux"
import * as Action from "../store/actions/auth.react"


type Props = {|
    +children: React.Node,
|};

type State = {|
    notificationsObjects: Array<NotificationProps>,
|};

type subNavItem = {|
    +value: string,
    +to?: string,
    +icon?: string,
    +LinkComponent?: React.ElementType,
    +useExact?: boolean,
|};

type navItem = {|
    +value: string,
    +to?: string,
    +icon?: string,
    +active?: boolean,
    +LinkComponent?: React.ElementType,
    +subItems?: Array<subNavItem>,
    +useExact?: boolean,
|};






function SiteWrapper( props ) {
    const dispatch = useDispatch()
    const pk = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).pk
        : null

    const accountDropdownProps = {
        avatarURL: "",
        name : localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo")).userName
            : "Guest",
        // description: "Administrator",
        options: [
            { icon: "user", value: "Profile" },
            { isDivider: true },
            localStorage.getItem("userInfo")
            ? { icon: "log-out", value: "Sign out", to: "/", onClick:()=>{ dispatch(Action.logoutUser()) }}
            : { icon: "log-in", value: "login" , to: "/login"}, { icon: "airplay", value: "register" , to: "/register"}
            ],
    };
    var navBarItems: Array<nvaItem>
    console.log(">>>>>", pk!==1)
    pk!==1?
        navBarItems = [
            {
                value: "Home",
                to: "/",
                icon: "home",
                LinkComponent: withRouter(NavLink),
                useExact: true,
            },
            {
                value: "Problem",
                icon: "grid",
                subItems: [
                    {
                        value: "모든 문제",
                        to: "/problem",
                        LinkComponent: withRouter(NavLink),
                    },
                    { value: "내가 푼 문제",
                        to: "/problem-my",
                        LinkComponent: withRouter(NavLink) },
                ],
            },
            {
                value: "Community",
                icon: "message-square",
                subItems: [
                    { value: "Maps", to: "/maps", LinkComponent: withRouter(NavLink) },
                    { value: "Icons", to: "/icons", LinkComponent: withRouter(NavLink) },
                    { value: "Store", to: "/store", LinkComponent: withRouter(NavLink) },
                    { value: "Blog", to: "/blog", LinkComponent: withRouter(NavLink) },
                ],
            },
            {
                value: "Ranking",
                icon: "thumbs-up",
                to: "/ranking",
                LinkComponent: withRouter(NavLink),
            },

        ]
        : // Admin
        navBarItems= [
        {
            value: "Home",
            to: "/",
            icon: "home",
            LinkComponent: withRouter(NavLink),
            useExact: true,
        },
        {
            value: "Problem",
            icon: "grid",
            subItems: [
                {
                    value: "모든 문제",
                    to: "/problem",
                    LinkComponent: withRouter(NavLink),
                },
                { value: "내가 푼 문제",
                    to: "/problem-my",
                    LinkComponent: withRouter(NavLink) },
            ],
        },
        {
            value: "Community",
            icon: "message-square",
            subItems: [
                { value: "Maps", to: "/maps", LinkComponent: withRouter(NavLink) },
                { value: "Icons", to: "/icons", LinkComponent: withRouter(NavLink) },
                { value: "Store", to: "/store", LinkComponent: withRouter(NavLink) },
                { value: "Blog", to: "/blog", LinkComponent: withRouter(NavLink) },
            ],
        },
        {
            value: "Ranking",
            icon: "thumbs-up",
            to: "/ranking",
            LinkComponent: withRouter(NavLink),
        },

        {
            value: "Add Problem",
            icon: "file-plus",
            to: "/addProblem",
            LinkComponent: withRouter(NavLink),
        }

    ];
    return (
        <Site.Wrapper
            headerProps={{
                href: "/",
                alt: "Code On Board",
                imageURL: "assets/images/logos/COB-B.png",
                accountDropdown: accountDropdownProps,
            }}
            navProps={{ itemsObjects: navBarItems }}
            routerContextComponentType={withRouter(RouterContextProvider)}
            footerProps={{
                note:
                    "Enjoy a lot of games!",
                nav: (
                    <React.Fragment>
                        <Grid.Col auto={true}>
                            <List className="list-inline list-inline-dots mb-0">
                                <List.Item className="list-inline-item">
                                    <a href="./docs/index.html">Documentation</a>
                                </List.Item>
                                <List.Item className="list-inline-item">
                                    <a href="./faq.html">FAQ</a>
                                </List.Item>
                            </List>
                        </Grid.Col>

                    </React.Fragment>
                ),
            }}
        >
            {props.children}
        </Site.Wrapper>
    );

}

export default SiteWrapper;
