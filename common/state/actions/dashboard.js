import * as types from '../constants/actionTypes'
import request from 'superagent/lib/client'

// API Endpoint
// ============
const apiEndpoint = '/api/dashboard'

// Dashboards
// ==========
export function addDashboardRequest(title) {
  return {
    type: types.ADD_DASHBOARD_REQUEST,
    title
  }
}

export function addDashboardSuccess(dashboard) {
  return {
    type: types.ADD_DASHBOARD_SUCCESS,
    dashboard
  }
}

export function addDashboardFailure(error) {
  return {
    type: types.ADD_DASHBOARD_FAILURE,
    error
  }
}

export function addDashboard(title) {
  return (dispatch) => {
    dispatch(addDashboardRequest(title))

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
