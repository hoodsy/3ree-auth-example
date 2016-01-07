import React, { PropTypes } from 'react'
import { DashboardHeaderContainer } from '../'

export const Dashboard = () => {
  return (
    <div>
      <DashboardHeaderContainer />

      {/*
      <AddList
        onAddListSubmit={ (dashboardId, title) => addList((dashboardId, title)) }
      />
      <ListContainer
        lists={ dashboard.lists }
        onAddSubmit={ (listId, url) => addResource(listId, url) }
      /> */}
    </div>
  )
}

