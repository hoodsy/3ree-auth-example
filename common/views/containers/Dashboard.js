import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../state/actions';
import { AddList,
         ListContainer,
         DashboardHeader } from '../';

export class Dashboard extends Component {

  render() {
    // Extract props
    const {
      dashboard,
      addList,
      addResource,
      completeResource,
    } = this.props;
    const {
      title,
      lists,
    } = dashboard;

    return (
      <div>
        <DashboardHeader
          title={ title }
        />
        <AddList
          onAddListSubmit={ text => addList(text) }
        />
        <ListContainer
          lists={ lists }
          onAddSubmit={ (listId, text) => addResource(listId, text) }
          onResourceClick={ (listIndex, index) => completeResource(listIndex, index) }
        />
      </div>
    );
  }

}

Dashboard.propTypes = {
  dashboard: PropTypes.object.isRequired,
  addList: PropTypes.function,
  addResource: PropTypes.function,
  completeResource: PropTypes.function,
};

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
