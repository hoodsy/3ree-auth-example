import React, { Component, PropTypes } from 'react';

export default class AddResource extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.input;
    const text = node.value.trim();
    if (text) {
      const { onAddSubmit, listId } = this.props;
      onAddSubmit(listId, text);
      // this.props.onAddSubmit(text, this.context.listIndex);
      node.value = '';
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" ref="input" />
          <button>
            Add
          </button>
        </form>
      </div>
    );
  }
}

AddResource.contextTypes = {
  listIndex: PropTypes.number,
};

AddResource.propTypes = {
  onAddSubmit: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
};
