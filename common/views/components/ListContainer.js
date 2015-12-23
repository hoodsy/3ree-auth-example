import React, { Component, PropTypes } from 'react';
import { ResourceList } from './components';

export default class ListContainer extends Component {

  _renderLists(list, listIndex) {
    return (
      <ResourceList
        { ...list }
        key={ listIndex }
        listIndex={ listIndex }
        onClick={ this.props.onResourceClick }
        onAddSubmit={ this.props.onAddSubmit }
      />
    );
  }

  render() {
    return (
      <div>
        { (this.props.lists)
            ? this.props.lists.map(this._renderLists)
            : null
        }
      </div>
    );
  }

}

ListContainer.propTypes = {
  onAddSubmit: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  onResourceClick: PropTypes.func,
};
