import React from 'react';

import { Switch, Route } from 'react-router-dom';

import ProjectsPage from '../ProjectsPage/ProjectsPage.jsx';
import ProjectPage from '../ProjectPage/ProjectPage.jsx';
import FeaturesPage from '../FeaturesPage/FeaturesPage.jsx';
import FeaturePage from '../FeaturePage/FeaturePage.jsx';
import LabelsPage from '../LabelsPage/LabelsPage.jsx';
import LabelPage from '../LabelPage/LabelPage.jsx';
import CreateFeaturesPage from '../CreateFeaturesPage/CreateFeaturesPage.jsx';
import CreateLabelsPage from '../CreateLabelsPage/CreateLabelsPage.jsx';
import CreateAlgorithmPage from '../CreateAlgorithmPage/CreateAlgorithmPage.jsx';
import CreateProjectPage from '../CreateProjectPage/CreateProjectPage.jsx';

function Main(myProps) {
  return (
    <div>
      {' '}
      {myProps.user.isAuthenticated && (
        <div style={{ height: '100%' }} className="Main">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <ProjectsPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/projects/:projectId"
              render={props => (
                <ProjectPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/projects"
              render={props => (
                <ProjectsPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/features/:featuresId"
              render={props => (
                <FeaturePage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/features"
              render={props => (
                <FeaturesPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/labels/:labelsId"
              render={props => (
                <LabelPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/labels"
              render={props => (
                <LabelsPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/createFeatures"
              render={props => (
                <CreateFeaturesPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/createLabels"
              render={props => (
                <CreateLabelsPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/createAlgorithm"
              render={props => (
                <CreateAlgorithmPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
            <Route
              path="/createProject"
              render={props => (
                <CreateProjectPage
                  {...props}
                  invalidateToken={myProps.invalidateToken}
                  user={myProps.user}
                />
              )}
            />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default Main;
