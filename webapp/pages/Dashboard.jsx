import React from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import InProgressIcon from 'react-icons/lib/md/av-timer';
import CoverageIcon from 'react-icons/lib/md/blur-linear';

import {loadBuildsForUser} from '../actions/builds';
import {subscribe} from '../decorators/stream';

import AsyncPage from '../components/AsyncPage';
import AsyncComponent from '../components/AsyncComponent';
import BuildList from '../components/BuildList';
import {ButtonLink} from '../components/Button';
import Collapsable from '../components/Collapsable';
import Layout from '../components/Layout';
import ObjectCoverage from '../components/ObjectCoverage';
import ObjectDuration from '../components/ObjectDuration';
import {Column, Header, ResultGrid, Row} from '../components/ResultGrid';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';

const RepoLink = styled(Link)`
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #f0eff5;
  }
`;

const RepoName = styled.div`font-weight: 500;`;

const Stat = styled.div`
  color: #666;

  svg {
    margin-right: 5px;
  }
`;

class RepoListSection extends AsyncComponent {
  static propTypes = {
    repoList: PropTypes.array
  };

  renderBody() {
    if (!this.props.repoList.length) {
      return (
        <Section>
          <p>
            {"Looks like you haven't yet setup and repositories. "}
            <Link to="/settings/github/repos">Add a repository</Link> to get started.
          </p>
        </Section>
      );
    }

    return (
      <Section>
        <ResultGrid>
          <Header>
            <Column>Repository</Column>
            <Column textAlign="center" width={90}>
              Coverage
            </Column>
            <Column textAlign="center" width={90}>
              Duration
            </Column>
          </Header>
          <Collapsable collapsable maxVisible={5}>
            {this.props.repoList.map(repo => {
              return (
                <RepoLink to={repo.full_name} key={repo.id}>
                  <Row>
                    <Column>
                      <RepoName>{`${repo.owner_name} / ${repo.name}`}</RepoName>
                    </Column>
                    <Column textAlign="center" width={90}>
                      {!!repo.latest_build &&
                        <Stat>
                          <InProgressIcon size={14} />
                          <ObjectDuration data={repo.latest_build} />
                        </Stat>}
                    </Column>
                    <Column textAlign="center" width={90}>
                      {!!repo.latest_build &&
                        !!(
                          repo.latest_build.stats.coverage.lines_covered +
                          repo.latest_build.stats.coverage.lines_uncovered
                        ) &&
                        <Stat>
                          <CoverageIcon size={14} />
                          <ObjectCoverage data={repo.latest_build} diff={false} />
                        </Stat>}
                    </Column>
                  </Row>
                </RepoLink>
              );
            })}
          </Collapsable>
        </ResultGrid>
      </Section>
    );
  }
}

const WrappedRepoList = connect(function(state) {
  return {repoList: state.repos.items, loading: !state.repos.loaded};
}, {})(RepoListSection);

class BuildListSection extends AsyncComponent {
  static propTypes = {
    buildList: PropTypes.array
  };

  fetchData() {
    return new Promise((resolve, reject) => {
      this.props.loadBuildsForUser('me', 10);
      return resolve();
    });
  }

  renderBody() {
    if (!this.props.buildList.length) {
      return null;
    }
    return (
      <Section>
        <SectionHeading>
          Your Builds
          <ButtonLink
            to="/builds"
            size="xs"
            style={{marginLeft: 10, verticalAlign: 'text-bottom'}}>
            &middot; &middot; &middot;
          </ButtonLink>
        </SectionHeading>
        <BuildList
          params={this.props.params}
          buildList={this.props.buildList}
          includeAuthor={false}
          includeRepo={true}
        />
      </Section>
    );
  }
}

const WrappedBuildList = connect(
  function(state) {
    let emailSet = new Set((state.auth.emails || []).map(e => e.email));
    return {
      buildList: state.builds.items.filter(build =>
        emailSet.has(build.source.author.email)
      ),
      loading: !state.builds.loaded
    };
  },
  {loadBuildsForUser}
)(subscribe((props, {repo}) => ['builds'])(BuildListSection));

export default class Dashboard extends AsyncPage {
  getTitle() {
    return 'Zeus Dashboard';
  }

  renderBody() {
    return (
      <Layout>
        <WrappedRepoList {...this.props} />
        <WrappedBuildList {...this.props} />
      </Layout>
    );
  }
}
