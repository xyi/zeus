import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';

import BuildListItem from './BuildListItem';
import TabbedNavItem from './TabbedNavItem';

export default class BuildList extends Component {
  render() {
    return (
      <BuildListWrapper>
        <BuildListHeader>
          <RepositoryName>getsentry/sentry</RepositoryName>
          <TabbedNav>
            <TabbedNavItem to="/" activeNavClass="active">My builds</TabbedNavItem>
            <TabbedNavItem>All builds</TabbedNavItem>
          </TabbedNav>
        </BuildListHeader>
        <ScrollView>
          {BUILDS.map((build) =>
            <BuildListItem key={build.id}
              message={build.message}
              status={build.status}
              duration={build.duration}
              timestamp={build.timestamp}
              author={build.author}
              branch={build.branch}
              commit={build.commit}
              slug={build.slug}
            />
          )}
        </ScrollView>
      </BuildListWrapper>
    );
  }
}

const BuildListWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 220px;
  bottom: 0;
  width: 380px;
  background: #F8F9FB;
  box-shadow: inset -1px 0 0 #DBDAE3;
`;

const BuildListHeader = styled.div`
  background: #fff;
  padding: 15px 20px 0;
  box-shadow: inset 0 -1px 0 #DBDAE3;
  margin-right: 1px;
`;

const RepositoryName = styled.div`
  font-size: 22px;
`;

const TabbedNav = styled.div`
  overflow: hidden;
`;

const ScrollView = styled.div`
  position: absolute;
  top: 93px; /* TODO(ckj): calculate this dynamically */
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;

const BUILDS = [
  {
    id: 1,
    message: "make this work again",
    status: "pass",
    duration: "6 mins",
    timestamp: "1m ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else/"
  },
  {
    id: 2,
    message: "various improvements",
    status: "pass",
    duration: "12 mins",
    timestamp: "2h ago",
    author: "dcramer",
    branch: "ui/fix-that-thing",
    commit: "11d655b",
    slug: "/"
  },
  {
    id: 3,
    message: "fix stuff",
    status: "fail",
    duration: "3 mins",
    timestamp: "2h ago",
    author: "dcramer",
    branch: "bug/wtf-did-we-do",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 4,
    message: "new sidebar lol",
    status: "pass",
    duration: "2 mins",
    timestamp: "3h ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 5,
    message: "resolve merge conflicts",
    status: "pass",
    duration: "6 mins",
    timestamp: "4h ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 6,
    message: "do this one other thing",
    status: "fail",
    duration: "2 mins",
    timestamp: "5h ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 7,
    message: "various improvements",
    status: "fail",
    duration: "6 mins",
    timestamp: "7h ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 8,
    message: "random stuff",
    status: "pass",
    duration: "12 mins",
    timestamp: "8h ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 9,
    message: "merge stuff",
    status: "pass",
    duration: "8 mins",
    timestamp: "9h ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 10,
    message: "um i hope this works",
    status: "fail",
    duration: "13 mins",
    timestamp: "12h ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 11,
    message: "TODO: fix this",
    status: "fail",
    duration: "13 mins",
    timestamp: "1d ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 12,
    message: "maybe one day this will do",
    status: "pass",
    duration: "13 mins",
    timestamp: "1d ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 13,
    message: "gotta make sure it scrolls",
    status: "pass",
    duration: "14 mins",
    timestamp: "2d ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  },
  {
    id: 14,
    message: "one last one for good luck",
    status: "fail",
    duration: "14 mins",
    timestamp: "3d ago",
    author: "dcramer",
    branch: "master",
    commit: "11d655b",
    slug: "/somewhere-else"
  }
];
