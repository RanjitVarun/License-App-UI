import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Storage } from 'react-jhipster';

export default function (ComposedComponent) {

  class Authenticate extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        isAuthenticated: false
      }
    }

    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { isAuthenticated } = this.props;
      if (!isAuthenticated) {
        //redirect();
      }
    }

    render() {
      var loadRoute, isAuthenticatedUser;
      isAuthenticatedUser = Storage.local.get("UserId");
      if (isAuthenticatedUser != null && isAuthenticatedUser != undefined && isAuthenticatedUser != "") {
        loadRoute = true
      }
      else {
        loadRoute = false
      }
      return (
        <div className="page-wrapper">
          {loadRoute ? <ComposedComponent {...this.props} /> : <Redirect to={{ pathname: "/"}} /> }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.loans.isAuthenticated
    };
  };

  const mapDispatchToProps = dispatch => bindActionCreators({
    //redirect: () => push('/')
  }, dispatch)

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.any
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);

}
