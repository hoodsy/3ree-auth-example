import React, { Component, PropTypes } from 'react';

export class AddList extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.input;
    const title = node.value.trim();
    if (title) {
      this.props.onAddListSubmit(title);
      node.value = '';
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" ref="input" />
          <button>
            Add List
          </button>
        </form>
      </div>
    );
  }
}

AddList.propTypes = {
  onAddListSubmit: PropTypes.func.isRequired,
};
