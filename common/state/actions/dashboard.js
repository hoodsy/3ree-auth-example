import request from 'superagent/lib/client'

import * as types from '../constants/actionTypes'

// API Endpoint
// ============
const apiEndpoint = '/api/dashboard'

// Private Actions
// ===============
function addDashboardRequest(title) {
  return {
    type: types.ADD_DASHBOARD_REQUEST,
    title
  }
}

function addDashboardSuccess(dashboard) {
  return {
    type: types.ADD_DASHBOARD_SUCCESS,
    dashboard
  }
}

function addDashboardFailure(error) {
  return {
    type: types.ADD_DASHBOARD_FAILURE,
    error
  }
}

// Public Actions
// ==============
export function addDashboard(title) {
  return (dispatch) => {
    dispatch(addDashboardRequest(title))
    console.log(title);
    return request
      .post(apiEndpoint)
      .send({ title })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(addDashboardFailure(err, title))
        } else {
          dispatch(addDashboardSuccess(res.body))
        }
      })
  }
}

export function setCurrentDashboard(dashboardId) {
  return {
    type: types.SET_CURRENT_DASHBOARD,
    dashboardId
  }
}
