﻿import React from 'react';
import axios from 'axios'
import { FormControl, FormGroup, Button, Col, Container,Row , Alert} from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from 'react-loader'
import Header from '../Common/Header';


class Client extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientName:'',
           clientList:[],
            loaded: false,
            customerNumber: '',
            
                errorClient:false,
                errorNumber:false
            

        };
    }
    componentDidMount() {

        axios.get(`/api/Clients`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientList: persons ,loaded:true});
            })
       

    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
        //const name = e.target.name;
        //const value = e.target.value;
        
        //if (!value == ""  && name=="clientName") {
        //    this.setState({ [e.target.name]: e.target.value, errorClient: false } );
        //}
        //else if (!value == "" && name== "customerNumber")
        //{
        //    this.setState({ [e.target.name]: e.target.value, errorNumber: false });
        //}
        //else {
        //    this.setState({ errorClient: true})
        //}
         //   < Alert variant = "danger" show = { this.state.errorClient || this.state.errorNumber } > Incorrect Details</Alert >
    }

   

    handleFormSubmit = (event) => {
        event.preventDefault();
       
        const user = {
            companyName: this.state.clientName,
          
        }
        console.log(this.state);
        axios.post(`/api/Clients`,  user )
            .then(res => {
                if (res.status == 200 || res.status == 201) {
                    confirmAlert({

                        message: 'Entry Added successfully',
                        buttons: [
                            {
                                label: 'Proceed',
                                onClick: () => this.renderListagain()
                            }]
                    });
                }
                else {
                    confirmAlert({

                        message: 'Entry Not Added',
                        buttons: [
                            {
                                label: 'Continue',
                                onClick: () => console.log('else block')
                            }]
                    });}

            });
        
        this.setState({ clientName:'' , customerNumber:''})
    }


    deleteClient = (e) => {
        console.log(e);
        confirmAlert({
 
            message: 'Are you sure to delete this entry',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/api/Clients/` + e).then(res =>
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
       
       
        axios.get(`/api/Clients`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientList: persons, loaded:true });
            })
    }

    renderClientList = () => {
        return this.state.clientList.map((result) => {
            return (

                <tr key={result.clientID}>
                    <td>{result.companyName}</td>
                    <td>{result.clientID}</td>
                    <td><button class="button primary-button" onClick={() => this.deleteClient(result.clientID)}>Delete</button>&nbsp;</td>
                </tr>

            )
        })
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
                            <form class="d-flex flex-wrap  custom-form" onSubmit={this.handleFormSubmit}>
                                <div class="form-group custom-form-group">
                                    <h6>Client Name</h6>
                                    <FormControl
                                        type="text"
                                        name='clientName'
                                        onChange={this.changeHandler}
                                        value={this.state.clientName}
                                        placeholder="Enter client Name" />
                                                <FormControl.Feedback />
                                               
                                            </div>  
                                            <div class="form-group custom-form-group">
                                                <h6>Customer Number</h6>
                                                <FormControl
                                                    type="text"
                                                    name='customerNumber'
                                                    onChange={this.changeHandler}
                                                    value={this.state.customerNumber}
                                                    placeholder="Enter Customer Number" />
                                                <FormControl.Feedback />
                                               

                                            </div>

                                           
                                          
                                <div class="form-group custom-form-group custom-button-group">
                                <button class="button primary-button float-sm-right" type="submit"> ADD</button>
                                </div>                               
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div class="d-sm-flex justify-content-between content-header my-3">                        
                        <h6>Client List</h6>
                        </div>                        
                            <Table responsive hover size="sm">
                                <thead>
                                                <tr key={this.state.temp}>
                                                    <th>Company Name</th>
                                        <th>Client ID</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>    
                                <tbody>
                                    {this.renderClientList()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                </div></div></div>
                </div>
                
        

        )

    }
}



export default Client;


       