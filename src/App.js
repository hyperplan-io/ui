import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import Projects from './components/Projects/Projects';

function Main() {
	return (
			<Switch>
				<Route exact path='/' component={Projects}/>
				<Route path='/projects' component={Projects}/>
			</Switch>
	);
}

function App() {
  return (
    <div className="App">
      <Navbar />
			<Main/>
        
    </div>
  );
}

export default App;
