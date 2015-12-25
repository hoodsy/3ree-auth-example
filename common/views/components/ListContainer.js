import React, { Component, PropTypes } from 'react';
import { ResourceList } from '../';

export class ListContainer extends Component {

  render() {
    return (
      <div>
        { this.props.lists.map((list, listIndex) =>
          <ResourceList
            { ...list }
            key={ listIndex }
            listIndex={ listIndex }
            onClick={ this.props.onResourceClick }
            onAddSubmit={ this.props.onAddSubmit }
          />
        )}
      </div>
    );
  }

}

ListContainer.propTypes = {
  onAddSubmit: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  onResourceClick: PropTypes.func,
};
