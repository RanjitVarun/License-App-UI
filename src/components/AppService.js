import React from 'react';
import axios from 'axios'
import { FormControl, FormGroup, Button, Col, Container, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from 'react-loader'
import Header from '../Common/Header';

class AppService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceName: '',
            sku:'',
            appServiceList: [],
            loaded: false

        };
    }
    componentDidMount() {

        axios.get(`/api/AppServices`)
            .then(res => {
                const persons = res.data;
             // console.log(persons)
               this.setState({ appServiceList: persons, loaded: true });
            })


    }

    changeHandler = (e) => {

        this.setState({ [e.target.name]: e.target.value }
        );


    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        const service = {
            serviceName: this.state.serviceName,
            sku:this.state.sku
        }
        axios.post(`/api/AppServices`, service)
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
        this.setState({ serviceName:'',sku:'' })
    }


    deleteService = (e) => {
        console.log(e);
        
        confirmAlert({

            message: 'Are you sure to delete this entry',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/api/AppServices/`+ e).then(res =>
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


        axios.get(`/api/AppServices`)
            .then(res => {
                const persons = res.data;
                this.setState({ appServiceList: persons, loaded: true });
            })
    }

    renderServiceList = () => {
        return this.state.appServiceList.map((result) => {
            return (

                <tr key={result.appServiceID}>
                    <td>{result.serviceName}</td>
                    <td>{result.appServiceID}</td>
                    <td>{result.sku}</td>
                    <td><Button onClick={() => this.deleteService(result.appServiceID)}>Delete</Button>&nbsp;</td>
                </tr>

            )
        })
    }



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
                            <form className="d-flex flex-wrap  custom-form" onSubmit={this.handleFormSubmit}>

                            <div className="form-group custom-form-group">
                                    <h5>App Service Name <span className="mandatorymark">*</span></h5> 
                                    <FormControl
                                        type="text"
                                        name='serviceName'
                                        onChange={this.changeHandler}
                                        value={this.state.serviceName}
                                        placeholder="Enter Service Name" required />
                                    <FormControl.Feedback />
                                    
                                </div>
                                <div className="form-group custom-form-group">
                                    <h5>SKU<span className="mandatorymark">*</span></h5>
                                    <FormControl
                                        type="text"
                                        name='sku'
                                        onChange={this.changeHandler}
                                        value={this.state.sku}
                                        placeholder="Enter sku id" required/>
                                    <FormControl.Feedback />

                                </div>
                                <div className="form-group custom-form-group custom-button-group">
                                <button className="button primary-button float-sm-right" type="submit"> ADD</button>
                                </div>                               
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>App Service List</h3>
                            <Table responsive hover size="sm">
                                <thead>
                                                <tr key={this.state.temp}>
                                                    <th>Service Name</th>
                                        <th>App Service ID</th>
                                        <th>SKU</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderServiceList()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>

            </div> </div> </div> </div>



        )

    }
}



export default AppService;


