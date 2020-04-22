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
            sku: '',
            appServiceList: [],
            loaded: false

        };
    }

    //Initial API call for app services

    componentDidMount() {

        axios.get(`/api/AppServices`)
            .then(res => {
                const persons = res.data;
                this.setState({ appServiceList: persons, loaded: true });
            })
    }

    //main change handler method

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value }
        );
    }

    //main appservice submit method

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        const service = {
            serviceName: this.state.serviceName,
            sku: this.state.sku
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
        this.setState({ serviceName: '', sku: '' })
    }

    //delete API call

    deleteService = (e) => {
        console.log(e);

        confirmAlert({

            message: 'Are you sure to delete this entry',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/api/AppServices/` + e).then(res =>
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

    //render list again after state changes

    renderListagain = () => {


        axios.get(`/api/AppServices`)
            .then(res => {
                const persons = res.data;
                this.setState({ appServiceList: persons, loaded: true });
            })
    }

    //render app service list in grid

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
                <div class="custom-container">
                    <div class="tab-content">
                        <div className="application-content custom-card" >
                            <Container fluid >
                                <Row>
                                    <Col>
                                        <form class="d-flex flex-wrap  custom-form" onSubmit={this.handleFormSubmit}>

                                            <div class="form-group custom-form-group">
                                                <h5>App Service Name</h5>
                                                <FormControl
                                                    type="text"
                                                    name='serviceName'
                                                    onChange={this.changeHandler}
                                                    value={this.state.serviceName}
                                                    placeholder="Enter Service Name" />
                                                <FormControl.Feedback />
                                            </div>
                                            <div class="form-group custom-form-group">
                                                <h5>SKU</h5>
                                                <FormControl
                                                    type="text"
                                                    name='sku'
                                                    onChange={this.changeHandler}
                                                    value={this.state.sku}
                                                    placeholder="Enter sku id" />
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
                                        <h5>App Service List</h5>
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


