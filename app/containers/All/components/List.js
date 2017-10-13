import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Swiper from './Swiper';
import ListItem from './ListItem';

class List extends Component {
  state = {
    isRefresh: false,
  }

  handleEndReached = () => {
    const { topics, appendTopics } = this.props;
    if(topics.length > 0) {
      appendTopics(topics[topics.length - 1].id);
    }
  }

  handleRefresh = () => {
    this.setState({ isRefresh: true });
    this.props.refresh(() => {
      this.setState({ isRefresh: false });
    });
  }

  renderItem({ item, index }) {
    return <ListItem data={item} />;
  }

  render() {
    const { style, swiper, topics } = this.props;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => item.id }
        data={topics}
        ListHeaderComponent={<Swiper data={swiper} />}
        renderItem={this.renderItem}
        refreshing={this.state.isRefresh}
        onRefresh={this.handleRefresh}
        onEndReachedThreshold={0.5}
        onEndReached={this.handleEndReached}
      />
    );
  }
}

export default List;