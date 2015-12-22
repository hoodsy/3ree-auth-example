import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/actions/actions';
import * as $ from '../components/components';

class App extends Component {

  render() {
    const { dispatch, lists } = this.props;
    return (
      <div>
        <$.AddList
          onAddListSubmit={ text => dispatch(actions.addList(text)) }
        />
        <$.ListContainer
          lists={ lists }
          onAddSubmit={ (text, index) => dispatch(actions.addTodo(text, index)) }
          onTodoClick={ (listIndex, index) => dispatch(actions.completeTodo(listIndex, index)) }
        />

      </div>
    );
  }

}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
};

function select(state) {
  return {
    lists: state.lists,
  };
}

export default connect(select)(App);
