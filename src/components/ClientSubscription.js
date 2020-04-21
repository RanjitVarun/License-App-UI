import React from 'react';
import axios from 'axios'
import { FormControl, Button, Col, Container, Row, Form, Navbar, InputGroup } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from 'react-loader'
import Header from '../Common/Header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class ClientSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientID: '',
            serviceID: '',
            clientList: [],
            serviceList:[],
            clientSubList: [],
            loaded: false,
            clientTitle: 'select client',
            subStatus: null,
            startDate: new Date(),
            filterValue: '',
            filtered: '',
            filteredResult:''
        };
    }


    componentDidMount() {

        axios.get(`api/ClientSubscriptions`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientSubList: persons, loaded: true });
            })

        axios.get(`/api/Clients`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientList: persons});
            })

        axios.get(`/api/AppServices`)
            .then(res => {
                const persons = res.data;
                this.setState({ serviceList: persons});
            })
    }

    
    changeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value }
        );
    }


    changeClientID = (e) => {
            this.state.clientList.map((result) => {
                if (result.companyName == e.target.value) {
                    this.setState({ clientID: result.clientID })
                }
                else { }
            }) 
    }


    changeServiceID = (e) => {
        this.state.serviceList.map((result) => {
            if (result.serviceName == e.target.value) {
                this.setState({ serviceID: result.appServiceID })
            }
        }) 
    }


    changeRadio = (e) => {
        this.setState({ subStatus: e.target.value })
    }


    handleDate = (e) => {
        this.setState({ startDate: e })
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
 
        const subscription = {
            clientID: this.state.clientID,
            appServiceID: this.state.serviceID,
            licenseExpiredDate: this.state.startDate,
			licenseActivationDate: new Date() ,
            isSubscriptionActive: this.state.subStatus
        }
        
        axios.post(`/api/ClientSubscriptions`, subscription)
            .then(res => {
                console.log(res)
            });
        confirmAlert({

            message: 'Entry added successfully',
            buttons: [
                {
                    label: 'Proceed',
                    onClick: () => this.setState({ loaded: false }, this.renderListagain())
                }]
        });
        this.setState({
            clientID: '',
            serviceID: '', subStatus:null
        })
    }


    deleteSubscription = (e) => {
        console.log(e);

        confirmAlert({

            message: 'Are you sure to delete this entry',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/api/ClientSubscriptions/`+e).then(res =>
                        this.setState({ loaded: false }, this.renderListagain())
                    )
                },
                {
                    label: 'No',
                    onClick: () => console.log('No')
                }
            ]
        });
    }


    renderListagain = () => {


        axios.get(`api/ClientSubscriptions`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientSubList: persons, loaded: true });
            })
    }


    sliceDate(date) {
        if (date == null) {
        }
        else {
            var date = date;
            var result = date.slice(0, 10);
            return result
        }
    }


    checkTrue(data) {
        if (data == true) {
            return <td style={{ color: "green" }}>active</td>
        }
        else {
            return <td style={{ color: "red" }}>Inactive</td>
        }
    }


   checkappServiceName = (e) => {
       return  this.state.serviceList.map((result) => {
           if (result.appServiceID == e) {
               return result.serviceName 
            }
        })
   }

    checkClientName = (e) => {
        return this.state.clientList.map((result) => {
            if (result.clientID == e) {
                return result.companyName
            }
        })
    }


    filterInput = (e) => {
        this.setState({ filterValue: e.target.value },this.filterValues)
    }


    filterValues = () => {
      
        let filterValue = this.state.filterValue;
        if (filterValue != "") {
            let filterClient = this.state.clientList.filter(
                (result) => {

                    return result.companyName.indexOf(this.state.filterValue) != -1

                }
            )
            let filterService = this.state.serviceList.filter(
                (result) => {
                    return result.serviceName.indexOf(this.state.filterValue) != -1
                }
            )
            if (filterClient.length != 0) {

                let value = filterClient.map((result) => { return result.clientID })


                this.setState({
                    filtered: value
                })

                this.checkfn() 
            }
            else if (filterService.length != 0) {

                let value = filterService.map((result) => { return result.appServiceID })
                this.setState({ filtered: value })
                this.checkfn() 
            }
            else {  }
        }
        else {
            this.setState({ filteredResult: "" })
        } 
    }


    renderClientSubList = () => {

        if (this.state.filteredResult != "") {
            return this.state.filteredResult.map((result) => {
                return (
                    <tr key={result.clientSubscriptionID}>
                        <td>{this.checkClientName(result.clientID)}</td>
                        <td>{this.checkappServiceName(result.appServiceID)}</td>
                        <td>{this.sliceDate(result.licenseExpiredDate)}</td>
                        <td>{this.sliceDate(result.licenseActivationDate)}</td>
                        {this.checkTrue(result.isSubscriptionActive)}
                        <td><Button onClick={() => this.deleteSubscription(result.clientSubscriptionID)}>Delete</Button>&nbsp;</td>
                    </tr>
                )
            })
        }

        else {
            return this.state.clientSubList.map((result) => {
                return (
                    <tr key={result.clientSubscriptionID}>
                        <td>{this.checkClientName(result.clientID)}</td>
                        <td>{this.checkappServiceName(result.appServiceID)}</td>
                        <td>{this.sliceDate(result.licenseExpiredDate)}</td>
                        <td>{this.sliceDate(result.licenseActivationDate)}</td>
                        {this.checkTrue(result.isSubscriptionActive)}
                        <td><Button onClick={() => this.deleteSubscription(result.clientSubscriptionID)}>Delete</Button>&nbsp;</td>
                    </tr>
                )
            })
        }
    }


    renderClientDropDown = () => {
        return this.state.clientList.map((result) => {
            return (
                <option key={result.clientID}>{result.companyName}</option>
            )
        })
    }


    renderServiceDropDown = () => {
        return this.state.serviceList.map((result) => {
            return (
                <option key={result.appServiceID}>{result.serviceName}</option>
            )
        })
    }


    checkfn = () => {
        let finalvalue = [];
        if (this.state.filtered != "") {

            let result = this.state.filtered.map((result) => {
                this.state.clientSubList.map((res) => {

                    if (result == res.clientID || result == res.appServiceID) {
                        finalvalue.push(res);
                    }
                })
            }) 
        }
        this.setState({ filteredResult: finalvalue })
    }
 



    render() {
        
        return (
            
            <div >
                <Loader loaded={this.state.loaded} />
                <Header onRef={ref => (this.child = ref)} />
                <div class="custom-container">
                <div class="tab-content">
                <div className="application-content custom-card" >
                <Container fluid >
                    <Row>
                        <Col>
                        <h5>Client Subscription Form</h5>
                            <form class="d-flex flex-wrap  custom-form" onSubmit={this.handleFormSubmit}>                               
                                <div class="form-group custom-form-group">
                                    <h5>Clients</h5>
                                    <select
                                        name='clientID'
                                        class="form-control custom-form-control custom-select-control"
                                        defaultValue={this.state.clientList}
                                        onChange={this.changeClientID}
                                    ><option>select client</option>
                                        
                                        {this.renderClientDropDown()}
                                    </select>
                                   
                                
                                </div>
                               
                                            <div class="form-group custom-form-group">
                                                <h5>Services</h5>
                                                <select
                                                    name='serviceID'
                                                    class="form-control custom-form-control custom-select-control"
                                                    defaultValue={this.state.serviceList}
                                                    onChange={this.changeServiceID}
                                                ><option>select service</option>

                                                    {this.renderServiceDropDown()}
                                                </select>

                                            </div>
                                            <div class="form-group custom-form-group">
                                                <h5>Expiry Date</h5>
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.handleDate}
                                                />

                                            </div>
                                <div class="form-group custom-form-group">
                                    <h5>Subscription Status</h5>
                                                <input
                                                    type="radio"
                                                    value="true"
                                                    checked={this.state.subStatus === "true"}
                                                    onChange={this.changeRadio}
                                                /> ACTIVE

                                                <br/>
                                                <input
                                                    type="radio"
                                                    value="false"
                                                    checked={this.state.subStatus === "false"}
                                                    onChange={this.changeRadio}
                                                /> INACTIVE
                                   
                                </div>
                                           
                                          
                                <div class="form-group custom-form-group custom-button-group">
                                <button class="button primary-button float-sm-right" type="submit"> ADD</button>
                                            </div>    
                            </form>
                        </Col>
                    </Row>
                    <Row>
                                    <Col>
                                        <Navbar className="bg-light justify-content-between">
                                            <Form inline>
                                                <h5>Subscription List</h5>
                                            </Form>
                                           <Form inline>
                                                <FormControl
                                                  className=" mr-sm-2"
                                                    type="text"
                                                    name='filterValue'
                                                    onChange={this.filterInput}
                                                    value={this.state.filterValue}
                                                    placeholder="search" />
                                                <FormControl.Feedback />
                                               
                                               
                                            </Form>
                                        </Navbar>
                            
                            <Table responsive hover size="sm">
                                <thead>
                                    <tr key={this.state.temp}>
                                        
                                        <th>Client Name</th>
                                        <th>AppService Name</th>
                                        <th>LicenseExpiredDate</th>
                                        <th>LicenseActivationDate</th>
                                        <th>SubscriptionActive</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderClientSubList()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                           
            </div>  </div>  </div>  </div>
        )

    }
}


export default ClientSubscription;


