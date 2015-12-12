import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.input;
    const text = node.value.trim();
    if (text) {
      this.props.onAddSubmit(text, this.context.listIndex);
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

AddTodo.contextTypes = {
  listIndex: PropTypes.number,
};

AddTodo.propTypes = {
  onAddSubmit: PropTypes.func.isRequired,
};
