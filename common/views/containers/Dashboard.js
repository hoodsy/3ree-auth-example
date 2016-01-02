import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../state/actions';
import { AddList,
         ListContainer,
         DashboardHeader } from '../';

export class Dashboard extends Component {

  render() {
    const { dispatch, dashboard } = this.props;
    const { title, lists } = dashboard;
    return (
      <div>
        <DashboardHeader
          title={ title }
        />
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

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
};

function select(state) {
  return {
    dashboard: state.dashboard,
  };
}

export default connect(select)(Dashboard);
