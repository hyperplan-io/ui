import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import Navbar from './components/Navbar/Navbar';
import Projects from './components/Projects/Projects';
import Features from './components/Features/Features';

function Main() {
	return (
			<div className="Main">
			<Switch >
				<Route exact path='/' component={Projects}/>
				<Route path='/projects' component={Projects}/>
				<Route path='/features' component={Features}/>
			</Switch>
			</div>
	);
}

function App() {
  return (
    <div className="App">
      <Navbar />
			<Main className="Main"/>
        
    </div>
  );
}

export default App;
