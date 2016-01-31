import React, { PropTypes } from 'react'
import _ from 'lodash'

import { List, Resource } from '../../'

export const ListPicker = (
  { listsById,
    resourcesById,
    currentList,
    currentDashboard,
    setCurrentList }) =>
(
  <div>
    { _.keys(listsById)
      .filter(id =>
        listsById[id]['dashboardId'] === currentDashboard) // only display lists of currentDashboard
      .map(listId =>
        <List
          { ...listsById[listId] }
          key={ listId }
          currentList={ currentList }
          onClick={ setCurrentList }>

          { _.keys(resourcesById)
            .filter(id =>
              resourcesById[id]['listId'] === listId)
            .map(resourceId =>
              <Resource
                { ...resourcesById[resourceId] }
                key={ resourceId } />
          )}

        </List>
    )}
  </div>
)

ListPicker.propTypes = {
  listsById: PropTypes.object.isRequired,
  resourcesById: PropTypes.object.isRequired,
  currentList: PropTypes.string.isRequired,
  currentDashboard: PropTypes.string.isRequired,
  setCurrentList: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}
