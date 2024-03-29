import React from 'react';

import { Card, FormGroup, InputGroup, Button } from '@blueprintjs/core';
import './SignIn.css';

import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';

import { signIn } from '../../utils/Api';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      user: props.user,
    };
    this.initialValues = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.invalidateToken = this.invalidateToken.bind(this);
  }

  invalidateToken() {
    console.log('invalidate token');
    localStorage.setItem('isAuthenticated', false);
    this.setState({
      user: {
        isAuthenticated: false,
        accessToken: null,
      },
    });
  }

  handleSubmit() {
    signIn(this.state.form.username, this.state.form.password).then(body => {
      const accessToken = body.token;
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('accessToken', accessToken);

      this.setState(prevState => ({
        form: prevState.form,
        user: {
          isAuthenticated: true,
          accessToken: accessToken,
        },
      }));
    });
  }

  onUsernameChange(event) {
    const username = event.target.value;
    this.setState(prevState => ({
      user: prevState.user,
      form: {
        username: username,
        password: prevState.form.password,
      },
    }));
  }

  onPasswordChange(event) {
    const password = event.target.value;
    this.setState(prevState => ({
      user: prevState.user,
      form: {
        username: prevState.form.username,
        password: password,
      },
    }));
  }
  render() {
    if (this.state.user.isAuthenticated) {
      return (
        <div>
          <Navbar user={this.state.user} />
          <Main invalidateToken={this.invalidateToken} user={this.state.user} className="Main" />
        </div>
      );
    } else {
      return (
        <div>
          <div className="topHalf" />
          <div className="bottomHalf" />
          <div className="formPadding">
            <FormGroup className="MyForm" inline="true" labelFor="text-input">
              <Card className="wideCard">
                <h1 className="centerGrey">Hyperplan.io </h1>
                <h3 className="centerGrey">Login</h3>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.handleSubmit();
                  }}
                >
                  <InputGroup
                    onChange={this.onUsernameChange}
                    className="authenticationField"
                    type="text"
                    id="text-input"
                    placeholder="Username"
                  />
                  <br />
                  <InputGroup
                    onChange={this.onPasswordChange}
                    className="authenticationField"
                    type="password"
                    id="text-input"
                    placeholder="Password"
                  />
                  <Button
                    type="submit"
                    className="signInButton"
                    text="Sign in"
                    intent="success"
                    onClick={this.handleSubmit}
                  />
                </form>
              </Card>
            </FormGroup>
          </div>
        </div>
      );
    }
  }
}

export default SignIn;
