import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../state/actions';
import { AddList,
         ListContainer,
         DashboardHeader } from '../';

export class Dashboard extends Component {

  render() {
    const {
      dashboard,
      addList,
      addResource,
    } = this.props;

    return (
      <div>
        <DashboardHeader
          title={ dashboard.title }
        />
        <AddList
          onAddListSubmit={ title => addList(title) }
        />
        <ListContainer
          lists={ dashboard.lists }
          onAddSubmit={ (listId, url) => addResource(listId, url) }
        />
      </div>
    );
  }

}

Dashboard.propTypes = {
  dashboard: PropTypes.object.isRequired,
  addList: PropTypes.func,
  addResource: PropTypes.func,
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
