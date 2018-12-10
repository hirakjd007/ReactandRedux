import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './BuSummary.css';
import { connect } from 'react-redux';
class BugSummaryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            usersArray: [],
            isLoaded: false,
            toDashboard: false,
            value: '52'
        }
    }

    handlePrint = () =>{
        console.log(this.state.value);
        fetch('http://192.168.69.91:8080/TestDashboard/webapi/bugs/week/'+this.state.value)
        .then(Response => Response.json())
        .then(res => {
            console.log(res);
            this.setState({
                isLoaded: true,
                items: res,
                usersArray: []
            });
        })
        .catch(error => {
            console.log(error)
        });
        console.log("Printing items here",this.state.items);
    }

    routeChangeNow = (params) => {
        this.setState({
            toDashboard: true
        });
        this.props.routeChange(params);
        console.log(this.props);
        // this.props.history.push('/developerDashboard');

    }

    countName(params) {
        var count = 0;
        this.state.items.map(item => {
            if (item.assignee === params)
                count++;
        })
        return count;
    }

    validateUsers(params) {
        if (this.state.usersArray.includes(params))
            return true;
        else {
            this.state.usersArray.push(params);
            return false;
        }
    }

    componentDidUpdate() {
        var { toDashboard } = this.state;
        if (toDashboard) {
            this.props.history.push('/developerDashboard');
        }
    }

    handleChange = (e) => {
         this.setState({ value: e.target.value });
         
    }
    componentDidMount() {
        fetch('http://192.168.69.91:8080/TestDashboard/webapi/bugs')
         //   fetch('http://192.168.69.91:8080/TestDashboard/webapi/bugs/week/'+this.state.value)
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
        var { isLoaded, toDashboard,value } = this.state;
        if (!isLoaded) {
            console.log(this.props);
            console.log("toDashboard", toDashboard);
            console.log("Value of dropdown",value);
            return (<div>Loading
                <br />
            </div>
            )
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
                                <select onChange={this.handleChange}>
                                    <option value="1">Week</option>
                                    <option value="4">Month</option>
                                    <option value="52">Year</option>
                                </select>
                                &nbsp;
                                &nbsp;
                        <input className="btn btn-primary" type="submit" onClick={() => this.handlePrint()} value="Search"></input>
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
                                        this.validateUsers(dynamicData.assignee) ? null :
                                            <tr>
                                                <td> <button className="btn btn-secondary btn-lg btn-block" onClick={() => this.routeChangeNow(dynamicData.assignee)}>{dynamicData.assignee}</button></td>
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



const mapStateToProps = state => {
    return {
        developerName: state.developerName,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        routeChange: (params) => dispatch({ type: 'UPDATE_DEVELOPER', val: params }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BugSummaryTable));
