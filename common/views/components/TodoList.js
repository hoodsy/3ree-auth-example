import React, { Component, PropTypes } from 'react';
import { Todo, AddTodo } from './components';

export default class TodoList extends Component {

  getChildContext() {
    return { listIndex: this.props.listIndex };
  }

  render() {
    return (
      <div>
        <h3> { this.props.text } </h3>
        <ul>
          { this.props.todos.map((todo, index) =>
            <Todo
              {...todo}
              key={index}
              index={index}
              onClick={ this.props.onClick }
            />
          )}
        </ul>
        <AddTodo
          listIndex={ this.props.listIndex }
          onAddSubmit={ this.props.onAddSubmit }
        />
      </div>
    );
  }
}

TodoList.childContextTypes = {
  listIndex: PropTypes.number,
};

TodoList.propTypes = {
  onClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  listIndex: PropTypes.number.isRequired,
  text: PropTypes.text.isRequired,
  onAddSubmit: PropTypes.func.isRequired,
};
