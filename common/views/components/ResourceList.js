import React, { Component, PropTypes } from 'react';
import { Resource, AddResource } from '../';

export class ResourceList extends Component {

  render() {
    return (
      <div>
        <h3> { this.props.title } </h3>
        <ul>
          { this.props.resources.map((resource, index) =>
            <Resource
              { ...resource }
              key={ index }
            />
          )}
        </ul>
        <AddResource
          listId={ this.props.id }
          onAddSubmit={ this.props.onAddSubmit }
        />
      </div>
    );
  }
}

ResourceList.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  title: PropTypes.string.isRequired,
  onAddSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
