import React, { PropTypes } from 'react'

import { List } from '../../'

export const ListPicker = (
  { listsById,
    currentList,
    setCurrentList }) =>
(
  <div>
    { Object.keys(listsById).map((id, index) =>
      <List
        { ...listsById[id] }
        key={ index }
        currentList={ currentList }
        onClick={ setCurrentList } />
    )}
  </div>
)

ListPicker.propTypes = {
  listsById: PropTypes.object.isRequired,
  currentList: PropTypes.string.isRequired,
  setCurrentList: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}
