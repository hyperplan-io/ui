import React from 'react';
import './Navbar.css'

import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="sticky_top"> 
			<Link className="title_element" to="/Projects">Projects</Link>
			<Link className="title_element" to="/Features">Features</Link>
			<Link className="title_element" to="/Labels">Labels</Link>
		</div>
	)
}

export default Navbar;
