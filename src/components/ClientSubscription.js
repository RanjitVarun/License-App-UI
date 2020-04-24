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
import ReactPaginate from 'react-paginate';

class ClientSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientID: '',
            serviceID: '',
            clientList: [],
            serviceList: [],
            clientSubList: [],
            loaded: false,
            clientTitle: 'select client',
            subStatus: null,
            startDate: new Date(),
            filterValue: '',
            filtered: '',
            filteredResult: '',
            renderPageBar: false,
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 0,
            errors: '',
            mappedClientSubList: ""

        };
    }

    // initial API call for client, appservice, clientsubscriptions

    componentDidMount() {
        axios.get(`api/ClientSubscriptions`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientSubList: persons, loaded: true }, this.paginate);
            })
        axios.get(`/api/Clients`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientList: persons });
            })
        axios.get(`/api/AppServices`)
            .then(res => {
                const persons = res.data;
                this.setState({ serviceList: persons });
            })
       
        //this.mappedClientsServiceName()
    }


    mappedClientsServiceName = () => {
        console.log("here")
        console.log(this.state.clientList, this.state.serviceList, this.state.clientSubList)
        console.log("hello")
      //  let finalValue = [];
      ////  this.state.clientSubList.map((result) => {
      //      //console.log(result.clientID)
      //      this.state.clientList.map((clientRes) => {
      //          //console.log(clientRes.clientID)
               
      //      })
      // // })
      ////  this.setState({ mappedClientSubList:finalValue })

    }

     //this.state.serviceList.map((serviceRes) => {
     //    if (result.clientID == clientRes.clientID && result.appServiceID == serviceRes) {
     //        finalValue.push(result.clientSubscriptionID, clientRes.companyName, serviceRes.serviceName,
     //            result.licenseExpiredDate, result.licenseActivationDate, result.isSubscriptionActive)
     //    }
     //})

  

    // state change events
    //main change handler event

    changeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value }
        );
    }

    //dropdown mapping for obtaining the client ID from the client Name for posting

    changeClientID = (e) => {
        this.state.clientList.map((result) => {
            if (result.companyName == e.target.value) {
                this.setState({ clientID: result.clientID })
            }
            else { }
        })
    }

    //dropdown mapping for obtaining the appservice ID from the appservice Name for posting

    changeServiceID = (e) => {
        this.state.serviceList.map((result) => {
            if (result.serviceName == e.target.value) {
                this.setState({ serviceID: result.appServiceID })
            }
        })
    }

    //change function for the Radio button

    changeRadio = (e) => {
        this.setState({ subStatus: e.target.value })
    }

    //change function for the Date picker

    handleDate = (e) => {
        this.setState({ startDate: e })
    }

    //change function for the onclick of page number

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => {
            this.paginate()
        });
    }

    //submit the overall form to clientsubscription API

    handleFormSubmit = (event) => {
        event.preventDefault();
        let errormsg = '';
        console.log(this.state.mappedClientSubList)
        //const subscription = {
        //    clientID: this.state.clientID,
        //    appServiceID: this.state.serviceID,
        //    licenseExpiredDate: this.state.startDate,
        //    licenseActivationDate: new Date(),
        //    isSubscriptionActive: this.state.subStatus
        //}

        //if (this.state.clientID == "" || this.state.serviceID == "")
        //    {
        //        if (this.state.clientID == "")
        //            {errormsg = "Client Input Required";}
        //        else if (this.state.serviceID == "")
        //            {errormsg = "Service Input Required";}
        //        alert(errormsg);
        //        return false;
        //    }      
        //else
        //{
        //    axios.post(`/api/ClientSubscriptions`, subscription)
        //        .then(res => {
        //            console.log(res)
        //        });
        //    confirmAlert({

        //        message: 'Entry added successfully',
        //        buttons: [
        //            {
        //                label: 'Proceed',
        //                onClick: () => this.setState({ loaded: false }, this.renderListagain())
        //            }]
        //    });
        //    this.setState({
        //        clientID: '',
        //        serviceID: '', subStatus: null
        //    })
        //}   
    }

    //delete API call

    deleteSubscription = (e) => {
        console.log(e);

        confirmAlert({

            message: 'Are you sure to delete this entry',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/api/ClientSubscriptions/` + e).then(res =>
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

    //Check functions
    // check App service from the appservice state list

    checkappServiceName = (e) => {
        return this.state.serviceList.map((result) => {
            if (result.appServiceID == e) {
                return result.serviceName
            }
        })
    }

    //check client name from the client state list

    checkClientName = (e) => {
        return this.state.clientList.map((result) => {
            if (result.clientID == e) {
                return result.companyName
            }
        })
    }

    //check pagination properites

    paginate = () => {
        const pageCount = Math.ceil(this.state.clientSubList.length / this.state.perPage)
        this.setState({ pageCount: pageCount })
        const elements = this.state.clientSubList.slice(this.state.offset, this.state.offset + this.state.perPage)
       
        this.setState({ elements: elements, renderPageBar: true })
    }

    

    //slice date function

    sliceDate(date) {
        if (date == null) {
        }
        else {
            var date = date;
            var result = date.slice(0, 10);
            return result
        }
    }

    //Display green and red for active and inactive services


    checkTrue(data) {
        if (data == true) {
            return <td style={{ color: "green" }}>active</td>
        }
        else {
            return <td style={{ color: "red" }}>Inactive</td>
        }
    }

    //render methods
    //render page number bar

    renderPageNumbersBar = () => {
        if (this.state.renderPageBar) {
            return <ReactPaginate
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={<span className="gap">...</span>}
                pageCount={this.state.pageCount}
                onPageChange={this.handlePageClick}
                forcePage={this.state.currentPage}
                containerClassName={"pagination"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
            />
        }
    }

    //render list again after any changes

    renderListagain = () => {


        axios.get(`api/ClientSubscriptions`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientSubList: persons, loaded: true });
            })
    }


    //filter functions
    //filter state change

    filterInput = (e) => {
        this.setState({ filterValue: e.target.value }, this.filterValues)
        
    }

    //filter the values from state clientsubList list 

    filterValues = () => {
        
        let filterValue = this.state.filterValue;
        if (filterValue != "" && filterValue.length >= 3) {
            
            let filterClient = this.state.clientList.filter(
                (result) => {

                    return result.companyName.toLowerCase().indexOf(this.state.filterValue) != -1

                }
            )
            let filterService = this.state.serviceList.filter(
                (result) => {
                    return result.serviceName.toLowerCase().indexOf(this.state.filterValue) != -1
                }
            )

            if (filterClient.length != 0) {
                let finalvalue = [];
                let value = filterClient.map((result) => { return result.clientID })
              

                let result = value.map((result) => {
                    this.state.clientSubList.map((res) => {

                        if (result == res.clientID) {
                            finalvalue.push(res);
                        }
                    })
                })
                this.setState({ filteredResult: finalvalue })  
            }
            else if (filterService.length != 0) {
                let finalvalue = [];
                let value = filterService.map((result) => { return result.appServiceID })
                let result = value.map((result) => {
                    this.state.clientSubList.map((res) => {

                        if (result == res.appServiceID) {
                            finalvalue.push(res);
                        }
                    })
                })
                this.setState({ filteredResult: finalvalue })
              
            }
            else {  }
        }
        else {
            this.setState({ filteredResult: "" })
        }
    }

   

    //render the final client list in grid

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
            return this.state.elements.map((result) => {
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

    //render the client API droopdown

    renderClientDropDown = () => {
        return this.state.clientList.map((result) => {
            return (
                <option key={result.clientID}>{result.companyName}</option>
            )
        })
    }

    //render the appservice API dropdown

    renderServiceDropDown = () => {
        return this.state.serviceList.map((result) => {
            return (
                <option key={result.appServiceID}>{result.serviceName}</option>
            )
        })
    }


    //render method

    render() {

        return (

            <div >
                <Loader loaded={this.state.loaded} />
                <Header onRef={ref => (this.child = ref)} />
                <div className="custom-container">
                <div className="tab-content">
                <div className="application-content custom-card" >
                <Container fluid >
                    <Row>
                        <Col>
                        <h2>Client Subscription Form</h2>
                            <form className="d-flex flex-wrap  custom-form" onSubmit={this.handleFormSubmit}>                               
                            <div className="form-group custom-form-group">
                                    <h5>Clients<span className="mandatorymark">*</span></h5>                                    
                                    <select
                                        name='clientID'
                                        className="form-control custom-form-control custom-select-control"
                                        defaultValue={this.state.clientList.indexOf(0)}
                                        onChange={this.changeClientID}     
                                                                           
                                    ><option>Select Client</option>                                        
                                        {this.renderClientDropDown()}                                        
                                    </select>                                                                                                  
                                </div>

                               
                                            <div className="form-group custom-form-group">
                                                <h5>Services<span className="mandatorymark">*</span></h5>
                                                <select
                                                    name='serviceID'
                                                    className="form-control custom-form-control custom-select-control"
                                                    defaultValue={this.state.serviceList.indexOf(0)}
                                                    onChange={this.changeServiceID}
                                                ><option>Select Service</option>

                                                    {this.renderServiceDropDown()}
                                                </select>
                                               
                                            </div>
                                            <div className="form-group custom-form-group">
                                                <h5>Expiry Date<span className="mandatorymark">*</span></h5>
                                                <DatePicker
                                                    className="form-control"
                                                    selected={this.state.startDate}
                                                    onChange={this.handleDate}
                                                    required
                                                />

                                            </div>
                                <div className="form-group custom-form-group">
                                    <h5>Subscription Status<span className="mandatorymark">*</span></h5>
                                    <div className="custom-radio-wrap mt-2">                                    
                                    <div className="custom-radio" >
                                    <label className="mb-0">
                                    <input
                                                    type="radio"
                                                    value="true"
                                                    checked={this.state.subStatus === "true"}
                                                    onChange={this.changeRadio}
                                                /> 
                                    <span></span> Active</label>
                                    </div>
                                    <div className="custom-radio" >
                                    <label className="mb-0">
                                    <input
                                                    type="radio"
                                                    value="false"
                                                    checked={this.state.subStatus === "false"}
                                                    onChange={this.changeRadio}
                                                /> 
                                    <span></span> InActive</label>   
                                    </div>                                            
                                   </div>
                                </div>
                                <div>
                                </div>
                                            <div className="form-group custom-form-group custom-button-group">
                                                <button className="button primary-button float-sm-right" type="submit"> ADD</button>
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
                                                    placeholder="search (min 3 characters)"
                                                   
                                                />
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

                                <Row className="justify-content-md-center">
                                    <Col>
                                        {this.renderPageNumbersBar()}
                                    </Col>
                                </Row>
                            </Container>

                        </div>  </div>  </div>  </div>
        )

    }
}


export default ClientSubscription;


