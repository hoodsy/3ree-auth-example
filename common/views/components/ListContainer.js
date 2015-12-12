import React, { Component, PropTypes } from 'react'
import { TodoList } from './components'

export default class ListContainer extends Component {
 
  render () {
    return (
      <div>
        { this.props.lists.map((list, listIndex) =>
          <TodoList 
            {...list}
            key={ listIndex }
            listIndex={ listIndex }
            onClick={ this.props.onTodoClick }
            onAddSubmit={ this.props.onAddSubmit }
          />
        )}
      </div>
    )
  }

}

ListContainer.propTypes = {
  onAddSubmit: PropTypes.func.isRequired
}
