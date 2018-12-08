import React, { Component } from 'react';
import './App.css';
import BugSummaryTable from '../src/components/BugSummaryTable';
import DeveloperDashboard from '../src/components/DeveloperDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">PC Bug App</header>
        <Route path="/" exact={true} component={BugSummaryTable}/>
        <Route path="/developerDashboard"  exact= {true} component={DeveloperDashboard}
        render={(props) => <DeveloperDashboard {...props} developerName='vagrawal2'/>}
        /> 
      </div>
      </Router>
    );
  }
}

export default App;
