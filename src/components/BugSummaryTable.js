import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './BuSummary.css';
class BugSummaryTable extends Component {


    constructor(props) {
        super(props);
        this.state = {
            items: [],
            usersArray : [],
            isLoaded: false,
            toDashboard:false
        }
    } 

    routeChange= () => {
       this.props.history.push('/developerDashboard');
        }

    countName(params) {
        var count = 0;
        this.state.items.map(item => {
            if (item.assignee === params)
                count++;
        })
        return count;
    }

    validateUsers(params){
        if(this.state.usersArray.includes(params))
        return true;
        else{
            this.state.usersArray.push(params);
            console.log(this.state.usersArray);
            return false;
        }
    }

    componentDidMount() {
        fetch('http://192.168.69.91:8080/TestDashboard/webapi/bugs')
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
            return <div>Loading
                <br/>
                <button class="btn btn-primary" onClick={this.routeChange} >Button</button>
            </div>
        }
        else {

            return (
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Enter Developer Name" aria-label="Text input with dropdown button" />
                            &nbsp;
                            &nbsp;
                        <div className="input-group-append">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter By Date</button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Week</a>
                                    <a className="dropdown-item" href="#">Month</a>
                                    <a className="dropdown-item" href="#">Year</a>
                                </div>
                                &nbsp;
                                &nbsp;
                        <input className="btn btn-primary" type="submit" value="Search"></input>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <table className="table-fill">
                            <thead>
                                <tr>
                                    <th className="text-left">Developer Name</th>
                                    <th className="text-left">Total Bug Count</th>
                                </tr>
                            </thead>
                            <tbody className="table-hover">
                                {
                                    this.state.items.map((dynamicData, key) =>
                                    this.validateUsers(dynamicData.assignee)?null:
                                        <tr>
                                            <td className="text-left">{dynamicData.assignee}</td>
                                            <td className="text-left">{this.countName(dynamicData.assignee)}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(BugSummaryTable);
