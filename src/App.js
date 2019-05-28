import React from 'react';

import SignIn from './components/SignIn/SignIn';

import './App.scss';

import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        accessToken: localStorage.getItem('accessToken')
      }
    }
  }

  
  render() {
    return (
    <BrowserRouter>
      <div className="App">
				<div className="AuthenticationForm">
				  <SignIn user={this.state.user}>
        </SignIn>
				</div>
      </div>
    </BrowserRouter>
    );
  }
  
}

export default App;
