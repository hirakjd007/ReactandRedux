import React, { Component } from 'react';
import './BuSummary.css';
class DeveloperDashboard extends Component {
  constructor(props){
      super(props);
  }
    render() {
        
            return (<div>Loading
                {this.props.developerName}
               </div>          
            );
        }
}

export default DeveloperDashboard;
