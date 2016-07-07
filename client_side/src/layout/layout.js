import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
	render() {
		return (
			<div className="container" className="top">
				<div className="row">
					<ul>
						<li className="col-lg-4">
							<Link to="/today">Weather!</Link>
						</li>
						<li className="col-lg-4"></li>
						<li className="col-lg-4">
							<Link to="/loginSignup">Login/Sign up</Link>
						</li>
					</ul>
				</div>
				<div className="row" className="top-menu">
					<ul>
						<li className="col-lg-2"></li>
						<li className="col-lg-2">
							<Link to="/today">Today</Link>
						</li>
						<li className="col-lg-2">
							<Link to="/hourly">Hourly</Link>
						</li>
						<li className="col-lg-2">
							<Link to="/fiveDay">5 Day</Link>
						</li>
						<li className="col-lg-2">
							<Link to="/yearly">Year to Year Comparison</Link>
						</li>
						<li className="col-lg-2"></li>
					</ul>
				</div>
				{this.props.children}
			</div>
		)
	}
}