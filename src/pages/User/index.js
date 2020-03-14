import React, { Component } from 'react';
import { View, Text } from 'react-native';

import PropTypes from 'prop-types';
import api from '../../services/api';
// import { Container } from './styles';

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      stars: [],
    };
  }

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    const { data } = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: data });
  }

  render() {
    const { stars } = this.state;

    return <View />;
  }
}

User.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};
