import React, { Component, PropTypes } from 'react'
import { List } from '../../'

export class ListContainer extends Component {

  render() {
    return (
      <div>
        { this.props.lists.map((list, listIndex) =>
          <List
            { ...list }
            key={ listIndex }
            onCreateSubmit={ this.props.onCreateSubmit }
          />
        )}
      </div>
    )
  }

}

ListContainer.propTypes = {
  onCreateSubmit: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired
}
