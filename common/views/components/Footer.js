import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {

  renderUndo() {
    return (
      <p>
        <button onClick={this.props.onUndo} disabled={this.props.undoDisabled}>Undo</button>
        <button onClick={this.props.onRedo} disabled={this.props.redoDisabled}>Redo</button>
      </p>
    );
  }

  render() {
    return (
      <div>
        {this.renderUndo()}
      </div>
    );
  }
}

Footer.propTypes = {
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  undoDisabled: PropTypes.bool.isRequired,
  redoDisabled: PropTypes.bool.isRequired,
};
