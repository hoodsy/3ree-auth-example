import React, { Component, PropTypes } from 'react';
import { Resource, AddResource } from './components';

export default class ResourceList extends Component {

  getChildContext() {
    return { listIndex: this.props.listIndex };
  }

  render() {
    return (
      <div>
        <h3> { this.props.text } </h3>
        <ul>
          { this.props.resources.map((resource, index) =>
            <Resource
              { ...resource }
              key={ index }
              index={ index }
              onClick={ this.props.onClick }
            />
          )}
        </ul>
        <AddResource
          listId={ this.props.id }
          listIndex={ this.props.listIndex }
          onAddSubmit={ this.props.onAddSubmit }
        />
      </div>
    );
  }
}

ResourceList.childContextTypes = {
  listIndex: PropTypes.number,
};

ResourceList.propTypes = {
  onClick: PropTypes.func.isRequired,
  resources: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  listIndex: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onAddSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
