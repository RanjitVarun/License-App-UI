import { Component } from 'react';
import { load } from "../../config";
import { Storage } from 'react-jhipster';
import PropTypes from 'prop-types';

export default class ConfigLoader extends Component {
    constructor(props){
        super(props);
      this.state = { isLoaded: false };
      this.loadConfig = this.loadConfig.bind(this);
    }


  componentDidMount() {
     // Once the configuration is loaded set `isLoaded` to true so we know to render our component
    load().then(config => this.loadConfig(config));
  }

  loadConfig(config) {
    this.setState({ isLoaded: true, config });
    Storage.local.set("ApolloApiUrl", config.ApolloApiUrl);
    Storage.local.set("ShowApplicationTab", config.ShowApplicationTab);
  }

  render() {      
    // If we haven't yet loaded the config, show either a "splash" component provided via a `loading` props or return nothing.
    if (!this.state.isLoaded) {
        return this.props.loading ? this.props.loading() : null;
    }

    // The config is loaded so show the component set on the `ready()` props
    return this.props.ready(this.state.config);
  }
}

ConfigLoader.propTypes = {
  loading: PropTypes.any,
  ready: PropTypes.any
}

