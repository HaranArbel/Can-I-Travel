import React from 'react';
import { Route } from 'react-router-dom'
import Projects from './Projects';
import CreateProject from './CreateProject';

function Content() {

  return (
        <div className="content">
            <Route exact path='/projects' component={Projects}/>
            <Route path='/create_project' component={CreateProject}/>
        </div>
    )

}

export default Content;
