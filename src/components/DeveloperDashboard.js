import React, { Component } from 'react';
import './DeveloperBugDetails.css';
import { connect } from 'react-redux';
class DeveloperDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('http://192.168.69.91:8080/TestDashboard/webapi/bugs/assignee/' + this.props.developerName + '/week/1')
            //fetch('https://facebook.github.io/react-native/movies.json')
            .then(Response => Response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    isLoaded: true,
                    items: res,
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        var { isLoaded } = this.state;
        if (!isLoaded) {
            console.log(this.props);
            return (<div>Loading for {this.props.developerName}
                <br />
            </div>
            )
        } else {
            return (
                <div className="container">
                    <br />
                    <br />
                    <div class="card-header">
                       <h4><span class="badge badge-pill badge-success"> {this.props.developerName} </span></h4>
                     </div>
                     <br />
                    {this.state.items.length===0?
                    <div className="card-header">
                    Currently {this.props.developerName} has <span class="badge badge-pill badge-warning"> 0 </span> open bugs
                    </div>
                    :
                    <div className="row text-center">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-left">Developer</th>
                                    <th className="text-left">Bug ID</th>
                                    <th className="text-left">Agent Name</th>
                                    <th className="text-left">Created</th>
                                    <th className="text-left">Department</th>
                                    <th className="text-left">White Board</th>

                                </tr>
                            </thead>
                            <tbody className="table-hover">
                                {
                                    this.state.items.map((dynamicData, key) =>
                                        <tr>
                                            <td className="text-left"> {dynamicData.assignee}</td>
                                            <td className="text-left">{dynamicData.bug_id}</td>
                                            <td className="text-left">{dynamicData.className}</td>
                                            <td className="text-left">{dynamicData.created}</td>
                                            <td className="text-left">{dynamicData.dept}</td>
                                            <td className="text-left">{dynamicData.whiteboard}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
            );
        }
    }
}


const mapStateToProps = state => {
    return {
        developerName: state.developerName
    };
};

export default connect(mapStateToProps)(DeveloperDashboard);
