import React, { Component } from 'react';
import Header from './components/Header';
import routes from './config/routes';

class App extends Component{
	render() {
		return (
    	<div className="container">
      		<Header/>
      		{ routes }
    	</div>
  	);
	};
};

export default App;
