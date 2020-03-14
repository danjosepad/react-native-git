import React from 'react';

import PropTypes from 'prop-types';
import { WebView } from 'react-native';

export default function Repository({ route }) {
  const { repository } = route.params;

  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />;
}

Repository.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};
