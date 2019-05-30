import React from 'react';
import { Card, H5 } from "@blueprintjs/core";

import './Project.css';

class Project extends React.Component {

  render() {
		return (
			<Card className="projectComponent" {...this.state}>
                    <H5>
                        <a href={`/Projects/${this.props.project.id}`}> { this.props.project.name}</a>
                    </H5>
                    <p>
											{ this.props.project.description } 
                    </p>
                </Card>
		)
	}
}

export default Project;
