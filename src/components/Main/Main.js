import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsPage from '../ProjectsPage/ProjectsPage';
import ProjectPage from '../ProjectPage/ProjectPage';
import FeaturesPage from '../FeaturesPage/FeaturesPage';
import FeaturePage from '../FeaturePage/FeaturePage';


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
			</Switch>
			</div>
  
  }
    </div>
	;
}

export default Main;
