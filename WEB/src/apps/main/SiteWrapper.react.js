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

const isStaff = localStorage.getItem("pk")

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

const logout = () =>{
  localStorage.removeItem("jwt");
  localStorage.removeItem("userName");
  localStorage.removeItem("pk");
  localStorage.removeItem("problemId");

}
var navBarItems: Array<nvaItem> 

isStaff!=="1"?
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
       to: "/problem/user/{user_id}",
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
:
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
       to: "/problem/user/{user_id}",
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
    to: "/addProblem2",
    LinkComponent: withRouter(NavLink),
  }

];

const accountDropdownProps = {
  avatarURL: "",
  name: localStorage.getItem("userName")===null? "Guest" : localStorage.getItem("userName"),
  // description: "Administrator",
  options: [
    { icon: "user", value: "Profile" },
    { isDivider: true },
    localStorage.getItem("userName")===null? { icon: "log-in", value: "login" , to: "/login"} :{ icon: "log-out", value: "Sign out", to: "/", onClick:()=>{ console.log("log out"); logout(); }}
    // { icon: "log-out", value: "Sign out" },
  ],
};

class SiteWrapper extends React.Component<Props, State> {
  state = {
    notificationsObjects: [
      {
        unread: true,
        avatarURL: "",
        message: (
          <React.Fragment>
            <strong>Nathan</strong> pushed new commit: Fix page load performance
            issue.
          </React.Fragment>
        ),
        time: "10 minutes ago",
      },
      {
        unread: true,
        avatarURL: "",
        message: (
          <React.Fragment>
            <strong>Alice</strong> started new task: Tabler UI design.
          </React.Fragment>
        ),
        time: "1 hour ago",
      },
      {
        unread: false,
        avatarURL: "",
        message: (
          <React.Fragment>
            <strong>Rose</strong> deployed new version of NodeJS REST Api // V3
          </React.Fragment>
        ),
        time: "2 hours ago",
      },
    ],
  };

  render(): React.Node {
    const notificationsObjects = this.state.notificationsObjects || [];
    const unreadCount = this.state.notificationsObjects.reduce(
      (a, v) => a || v.unread,
      false
    );
    return (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "Code On Board",
          imageURL: "http://localhost:3000/assets/images/logos/COB-B.png",
          notificationsTray: {
            notificationsObjects,
            markAllAsRead: () =>
              this.setState(
                () => ({
                  notificationsObjects: this.state.notificationsObjects.map(
                    v => ({ ...v, unread: false })
                  ),
                }),
                () =>
                  setTimeout(
                    () =>
                      this.setState({
                        notificationsObjects: this.state.notificationsObjects.map(
                          v => ({ ...v, unread: true })
                        ),
                      }),
                    5000
                  )
              ),
            unread: unreadCount,
          },
          accountDropdown: accountDropdownProps,
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          // links: [
          //   <a href="#">First Link</a>,
          //   <a href="#">Second Link</a>,
          //   <a href="#">Third Link</a>,
          //   <a href="#">Fourth Link</a>,
          //   <a href="#">Five Link</a>,
          //   <a href="#">Sixth Link</a>,
          //   <a href="#">Seventh Link</a>,
          //   <a href="#">Eigth Link</a>,
          // ],
          note:
            "Enjoy a lot of games!",
          // copyright: (
          //   <React.Fragment>
          //     Copyright © 2019
          //     <a href="."> Tabler-react</a>. Theme by
          //     <a
          //       href="https://codecalm.net"
          //       target="_blank"
          //       rel="noopener noreferrer"
          //     >
          //       {" "}
          //       codecalm.net
          //     </a>{" "}
          //     All rights reserved.
          //   </React.Fragment>
          // ),
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
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
