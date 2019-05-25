import React from 'react';
import { BrowserRouter, Route } from 'react-router';

import App from '../App.js';

export default (
	<BrowserRouter>
	  <div>
	    <Route path='/' component={App} />
  	</div>
	</BrowserRouter>
);
