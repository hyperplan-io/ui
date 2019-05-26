import React from 'react';
import './Navbar.css'

import { Navbar, NavbarGroup, Classes, NavbarHeading, Alignment, NavbarDivider, Button } from "@blueprintjs/core";


function MyNavbar() {
	return (
		<Navbar className="bp3-dark" style={ {position: 'fixed', top: 0}}> 
		<NavbarGroup align={Alignment.RIGHT}>
                        <NavbarHeading>FoundaMl</NavbarHeading>
                        <NavbarDivider />
                        <Button className={Classes.MINIMAL} icon="home" text="Projects" />
                        <Button className={Classes.MINIMAL} icon="document" text="Features" />
                        <Button className={Classes.MINIMAL} icon="document" text="Labels" />
                    </NavbarGroup>

		</Navbar>
	)
}

export default MyNavbar;
