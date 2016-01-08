import React, { PropTypes } from 'react'

import { List, Resource } from '../../'

export const ListPicker = (
  { listsById,
    resourcesById,
    currentList,
    currentDashboard,
    setCurrentList }) =>
(
  <div>
    { Object.keys(listsById)
      .filter(id =>
        listsById[id]['dashboardId'] === currentDashboard) // only display lists of currentDashboard
      .map((listId, index) =>
        <List
          { ...listsById[listId] }
          key={ index }
          currentList={ currentList }
          onClick={ setCurrentList }>

          { Object.keys(resourcesById)
            .filter(id =>
              resourcesById[id]['listId'] === listId)
            .map((resourceId, resourceIndex) =>
              <Resource
                { ...resourcesById[resourceId] }
                key={ resourceIndex } />
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
