import React, { Component, PropTypes } from 'react';

export class AddResource extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.input;
    const url = node.value.trim();
    if (url) {
      const { onAddSubmit, listId } = this.props;
      onAddSubmit(listId, url);
      node.value = '';
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="url" ref="input" />
          <button>
            Add
          </button>
        </form>
      </div>
    );
  }
}

AddResource.propTypes = {
  onAddSubmit: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
};
