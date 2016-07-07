require('dotenv').config();

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import {hashHistory, Router, Route, Redirect} from 'react-router';

import Layout from './layout/layout';

import DailyPage from './pages/daily';
import HourlyPage from './pages/hourly';
import LoginSignupPage from './pages/loginSignup';
import TodayPage from './pages/today';
import YearlyPage from './pages/yearly';

// Might change the redirect
const app = (
	<Router history={hashHistory}>
		<Redirect from="/" to="/daily" />
		<Route path="/" component={Layout}>
			<Route path="daily" component={DailyPage} />
			<Route path="hourly" component={HourlyPage} />
			<Route path="loginSignup" component={LoginSignupPage} />
			<Route path="today" component={TodayPage} />
			<Route path="yearly" component={YearlyPage} />
		</Route>
	</Router>
)

jQuery(function() {
	ReactDOM.render(
		app,
		document.getElementById('weather-box'),
		function() {
			console.timeEnd('react-app')
		}
	);
})