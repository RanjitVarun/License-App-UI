import React, { Component } from 'react';
import { Navbar, Nav, Collapse, Dropdown, Modal, Button } from 'bootstrap-4-react';
import { Link, withRouter } from 'react-router-dom';
import WhiteLogo from '../images/logo-white.png';
import HomeIcon from '../images/homeIcon.svg';
import PlusIcon from '../images/plusButton.svg';
import SettingsIcon from '../images/settingsIcon.svg';
import UserIcon from '../images/userIcon.svg';

import PropTypes from 'prop-types';
import ModalClose from '../images/modalClose.svg';


class Header extends Component {

  constructor(props) {
    super(props)
   // this.logOut = this.logOut.bind(this);
    this.state = {  
      idleTimeoutValue: 60000
    }
  //  this.editModeToggleChange = this.editModeToggleChange.bind(this);
    //this.onAction = this._onAction.bind(this);
    //this.onActive = this._onActive.bind(this);
    //this.onIdle = this._onIdle.bind(this);
    this.privileges = {};
    this.fillPrivileges();
  }

  fillPrivileges() {
    this.privileges = {
      "ExportLoan": false,
      "AddLoan": false,
      "DeleteLoan": false,
      "PreviewLoan": false,
      "EtranSubmit": false,
      "ViewSBAReport": false,
      "Reimport": false,
      "FlashSpread": false,
      "GenerateSBADocs": false,
      "SendToLaserPro": false,
      "SendToSBADocs": false,
      "BoardLoan": false,
      "Edit Loan": false,
      "ViewLibrary": false,
      "EditLibrary": false,
      "DeleteLibrary": false,
      "MapFormFieldsLibrary": false,
      "GlobalTemplate": false,
      "ViewDocuments": false,
      "AddDocuments": false,
      "MergeDocuments": false,
      "DeleteDocuments": false,
      "ViewInterestRate": false,
      "EditInterest Rate": false,
      "ViewOfficer": false,
      "EditOfficer": false,
      "DeleteOfficer": false,
      "SubscribeServices": false,
      "ViewUser": false,
      "AddUser": false,
      "EditUser": false,
      "DeactivateUser": false,
      "ResetUserPassword": false,
      "ViewProfile": false,
      "EditProfile": false,
      "ChangePassword": false,
      "ManageUserRoles": false,
      "ViewRole": false,
      "AddRole": false,
      "EditRole": false,
      "DeleteRole": false,
      "ManageRolePrivielges": false,
      "ChangeLogo": false,
      "ChangeTheme": false,
      "SetGlobalTheme": false,
      "OverwriteAllThemes": false,
      "DownloadLaserProDoc": false,
      "DownloadGlobalLibrary": false,
      "ViewGlobalLibrary": false,
      "CreateGlobalLibrary": false,
      "DeleteGlobalLibrary": false,
      "ViewLoanDocuments": false,
      "DownloadLoanDocuments": false,
      "DeleteLoanDocuments": false
    }

  }

  _onAction() {
  }

  _onActive() {
  }

  _onIdle() {
    if (this.state.idleTimeoutValue != null && this.state.idleTimeoutValue != undefined && this.state.idleTimeoutValue != "") {
      this.logOut();
    }
  }


  logOut() {
    if (this.props.hasOwnProperty('onLogOut'))
      this.props.onLogOut();

    this.props.history.push("/");
  }

  toggleFunction() {
    var element = document.getElementById("custom-search");
    element.classList.toggle("active");
  }

  dropdownToggle() {
    document.getElementById("custom-settings-menu").classList.toggle("active");
  }

  getIdleTimeOutMilliSeconds(hours, minutes, seconds) {
    var hrs = Number(hours);
    var min = Number(minutes);
    var sec = Number(seconds);
    return (((hrs * 60 * 60) + (min * 60) + sec) * 1000);
  }


  method() {
    window.alert('do stuff')
  }

  componentDidMount() {
    this.fillPrivileges();
    this.props.onRef(this);
    //this.setThemeSettingsData();
  }

  componentWillUnmount() {
    this.props.onRef();
  }

  goToPdfViewer(sbaFormId) {
    this.props.history.push("/pdfviewer/" + sbaFormId);
  }

  render() {

   // var headerLogo = this.getCurrentThemeSettingLogo();
    //var returnSBAFormsBody = this.state.SBAFormsList.map(function (data, index) {
    //  return (
    //    <li className="custom__dropdown-menu-item" key={index}>
    //      <a href="#" onClick={this.goToPdfViewer.bind(this, data.FormName)} className="dropdown-link">
    //        {data.FormName}
    //      </a>
    //    </li>
    //  )
    //}.bind(this))
    return (
      <div>
        <header className="site-header">
          <div className="custom-container">
            <Navbar expand="lg" light className="custom-navbar">
              <Navbar.Brand href="/loan-grid" className="site-logo">
                <img src={WhiteLogo} alt="Apollo License Manager" style={{height:"50px"}} />
              </Navbar.Brand>
              <Navbar.Toggler target="#navbarSupportedContent" />
              {/* <Collapse navbar id="navbarSupportedContent">
                <Navbar.Nav mr="auto" className="header-menu">
                  <Nav.Item className="custom-nav-item">
                    <Nav.Link href="/loan-grid" active className="custom-nav-link"><img src={HomeIcon} alt="Home" /></Nav.Link>
                  </Nav.Item>
                </Navbar.Nav>
                <Navbar.Nav my="2 lg-0" className="custom-menu">
                  <Nav.Item className="custom-menu-item">
                    <Nav.Link className="custom-menu-link custom-dropdown">
                      <Dropdown>
                        <Dropdown.Button id="dropdownMenuButton"><img src={PlusIcon} alt="Add" /></Dropdown.Button>
                        <Dropdown.Menu aria-labelledby="dropdownMenuButton" className="custom-dropdown-menu col-2 dropdown-menu-right">
                          <div className="clearfix">
                            <div className="dropdown-menu-list">
                              <ul className="list-unstyled">
                                <li className="custom-dropdown-header"><b> Loan</b></li>
                           
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/wordwrx" className="dropdown-link">
                                    Opportunity
                                                                    </Link>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/wordwrx" className="dropdown-link">
                                    Duplicate Loan
                                                                    </Link>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/wordwrx" className="dropdown-link">
                                    Tax Transcript
                                                                    </Link>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/wordwrx" className="dropdown-link">
                                    Loan Sale (1086)
                                                                    </Link>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/wordwrx" className="dropdown-link">
                                    Disbursement (1050)
                                                                    </Link>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/wordwrx" className="dropdown-link">
                                    Authorization
                                                                    </Link>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/wordwrx" className="dropdown-link">
                                    Laserpro Export
                                                                    </Link>
                                </li>
                            
                              </ul>
                            </div>
                            <div className="dropdown-menu-list">
                              <ul className="list-unstyled">
                                <li className="custom-dropdown-header"><b>Template</b></li>
                               <li className="custom-dropdown-menu-item">
                                  <Link to="/global-library" className="dropdown-link">
                                    Global Library
                                                                    </Link>
                                </li>
                             
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/pdfviewer" className="dropdown-link">
                                    Loan
                                                                    </Link>
                                </li>                          
                              </ul>
                            }
                            </div>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="custom-menu-item">
                    <Nav.Link className="custom-menu-link custom-dropdown">
                      <Dropdown>
                        <Dropdown.Button id="dropdownMenuButton"><img src={SettingsIcon} alt="Settings" /></Dropdown.Button>
                        <Dropdown.Menu aria-labelledby="dropdownMenuButton" className="custom-dropdown-menu col-2 dropdown-menu-right">
                          <div className="clearfix">
                            <div className="dropdown-menu-list">
                              <ul className="list-unstyled">
                                <li className="custom-dropdown-header"><b> Admin Settings</b></li>
                                <li className="custom-dropdown-menu-item">
                                  <Link className="dropdown-link" data-toggle="modal" data-target="#laserProModal">
                                    LaserPro Settings
                                                                    </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="dropdown-menu-list">
                              <ul className="list-unstyled">
                                <li className="custom-dropdown-header"><b>User Management</b></li>
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/user-management" className={"dropdown-link " }>
                                    Users
                                                                    </Link>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                  <Link to="/permission-groups" className={"dropdown-link " }>
                                    Permission Groups
                                                                    </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav.Link>
                  </Nav.Item>               
                  <Nav.Item className="custom-menu-item">
                    <Nav.Link className="custom-menu-link" href="#">
                      <Dropdown className="user-profile-dropdown">
                        <Dropdown.Button id="dropdownMenuButton" className="user-dropdown-button"><span className="user-icon"><img src={UserIcon} alt="User Profile" /></span> </Dropdown.Button>
                        <Dropdown.Menu aria-labelledby="dropdownMenuButton" className="dropdown-menu-right">
                          <Link to="/theme-settings" className="dropdown-item">Theme Settings</Link>
                          <Dropdown.Item onClick={this.logOut}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav.Link>
                  </Nav.Item>
                </Navbar.Nav>
              </Collapse> */}
            </Navbar>
          </div>
        </header>
        <ul role="tablist" class="nav-tabs nav navmenubar">
        <li class="nav-item">
            <a href="/" id="application-tab" class="nav-link active">Client</a>
            </li>
          <li class="nav-item">
            <a href="/appservice" id="application-tab" class="nav-link active">Service</a>
            </li>
            <li class="nav-item">
              <a href="/subscriptions" id="documents-tab" class="nav-link active">Client Subscription</a>
              </li>
              </ul>
      </div>     
    );
  }
}

Header.propTypes = {
  onLogOut: PropTypes.any,
  onLoanBoardServiceSubscription: PropTypes.any,
  history: PropTypes.any,
  headerLogo: PropTypes.any,
  onRef: PropTypes.any
};

export default withRouter(Header);
