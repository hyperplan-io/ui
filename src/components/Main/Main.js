import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Projects from '../Projects/Projects';
import Features from '../Features/Features';


function Main(myProps) {
	return <div> { myProps.user.isAuthenticated && 
			<div style={{ height: '100%'}} className="Main">
			<Switch >
				<Route 
          exact path='/' 
          render={(props) => <Projects {...props} user={myProps.user} />} 
        />
				<Route 
          path='/projects'
          render={(props) => <Projects {...props} user={myProps.user} />} 
        />
				<Route 
          path='/features' 
          component={Features}
        />
			</Switch>
			</div>
  
  }
    </div>
	;
}

export default Main;
