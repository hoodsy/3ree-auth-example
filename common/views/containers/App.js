import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../state/actions';
import { AddList,
         ListContainer } from '../';

class App extends Component {

  render() {
    const { dispatch, dashboard } = this.props;
    const { title, id, lists } = dashboard;
    return (
      <div>
        <AddList
          onAddListSubmit={ text => dispatch(actions.addList(text)) }
        />
        <ListContainer
          lists={ lists }
          onAddSubmit={ (listId, text) => dispatch(actions.addResource(listId, text)) }
          onResourceClick={ (listIndex, index) => dispatch(actions.completeResource(listIndex, index)) }
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
    dashboard: state.dashboard,
    // lists: state.dashboard.lists,
  };
}

export default connect(select)(App);
