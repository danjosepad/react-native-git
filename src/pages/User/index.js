import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      stars: [],
      loading: false,
      page: '2',
      refreshing: false,
    };
  }

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    this.setState({ loading: true });

    const { data } = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: data, loading: false });
  }

  loadMore = async () => {
    const { route } = this.props;
    const { user } = route.params;
    const { page, stars } = this.state;

    const { data } = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    this.setState({ stars: [...stars, ...data], page: page + 1 });
  };

  refreshList = async () => {
    const { route } = this.props;
    const { user } = route.params;

    this.setState({ refreshing: true });

    const { data } = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: data, refreshing: false });
  };

  handleNavigate = repository => {
    const { navigation } = this.props;

    navigation.navigate('WebView', { repository });
  };

  render() {
    const { route } = this.props;
    const { user } = route.params;

    const { stars, loading, refreshing } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#333" />
        ) : (
          <Stars
            data={stars}
            onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
            refreshing={refreshing}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
