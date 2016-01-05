import React, { Component, PropTypes } from 'react';

export class AddDashboard extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.input;
    const title = node.value.trim();
    if (title) {
      this.props.onAddDashboardSubmit(title);
      node.value = '';
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" ref="input" />
          <button>
            Add Dashboard
          </button>
        </form>
      </div>
    );
  }
}

AddDashboard.propTypes = {
  onAddDashboardSubmit: PropTypes.func.isRequired,
};
