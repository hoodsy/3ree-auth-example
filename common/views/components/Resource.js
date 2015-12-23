import React, { Component, PropTypes } from 'react';

export default class Resource extends Component {
  render() {
    return (
      <li
        onClick={ () => this.props.onClick(this.context.listIndex, this.props.index) }
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer',
        }}
      >
        { this.props.text }
      </li>
    );
  }
}

Resource.contextTypes = {
  listIndex: PropTypes.number,
};

Resource.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
