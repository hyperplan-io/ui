import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsPage from '../ProjectsPage/ProjectsPage';
import ProjectPage from '../ProjectPage/ProjectPage';
import FeaturesPage from '../FeaturesPage/FeaturesPage';
import FeaturePage from '../FeaturePage/FeaturePage';
import LabelsPage from '../LabelsPage/LabelsPage';
import LabelPage from '../LabelPage/LabelPage';
import CreateFeaturesPage from '../CreateFeaturesPage/CreateFeaturesPage';
import CreateLabelsPage from '../CreateLabelsPage/CreateLabelsPage';
import CreateAlgorithmPage from '../CreateAlgorithmPage/CreateAlgorithmPage';


function Main(myProps) {
	return <div> { myProps.user.isAuthenticated && 
			<div style={{ height: '100%'}} className="Main">
			<Switch >
				<Route 
          exact path='/' 
          render={(props) => <ProjectsPage {...props} user={myProps.user} />} 
        />
        <Route 
          path='/projects/:projectId'
          render={(props) => <ProjectPage {...props} user={myProps.user} />} 
        />
				<Route 
          path='/projects'
          render={(props) => <ProjectsPage {...props} user={myProps.user} />} 
        />
        <Route 
          path='/features/:featuresId' 
          render={(props) => <FeaturePage{...props} user={myProps.user} />} 
        />
				<Route 
          path='/features' 
          render={(props) => <FeaturesPage{...props} user={myProps.user} />} 
        />
        <Route 
          path='/labels/:labelsId' 
          render={(props) => <LabelPage{...props} user={myProps.user} />} 
        />
				<Route 
          path='/labels' 
          render={(props) => <LabelsPage{...props} user={myProps.user} />} 
        />
        <Route 
          path='/createFeatures' 
          render={(props) => <CreateFeaturesPage{...props} user={myProps.user} />} 
        />
				<Route 
          path='/createLabels' 
          render={(props) => <CreateLabelsPage{...props} user={myProps.user} />} 
        />
        <Route 
          path='/createAlgorithm' 
          render={(props) => <CreateAlgorithmPage{...props} user={myProps.user} />} 
        />
			</Switch>
			</div>
  
  }
    </div>
	;
}

export default Main;
