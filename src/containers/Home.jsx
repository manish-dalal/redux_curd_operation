import React, { Component } from 'react'
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import { Button, Table, Badge } from 'reactstrap'

import { updateItem, clearDoneItems } from 'redux/actions/Item'

class Home extends Component {
  handleNavigation = (pathname, state) => {
    this.props.history.push({ pathname, state })
  }
  handleDone = item => {
    const { dispatch } = this.props
    dispatch(updateItem({ ...item, done: true }))
  }
  handleClearAllDone = () => {
    const { dispatch } = this.props
    dispatch(clearDoneItems())
  }
  render() {
    const { items } = this.props
    let showClearTask = findIndex(items, ['done', true]) !== -1
    return (
      <div className="Home Card_container">
        <div className="Home_header">
          <Button color="primary" onClick={this.handleNavigation.bind(this, '/add-task', {})}>
            ADD TASK
          </Button>
          {showClearTask ? (
            <div className="Home_clear" onClick={this.handleClearAllDone}>
              Clear all the done tasks
            </div>
          ) : (
            void 0
          )}
        </div>
        <hr className="marginPadding" />
        <div className="Home_body">
          {items.length ? (
            <Table borderless>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="task_name">Task Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const { name, done, id } = item
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td className="task_name">{name}</td>
                      <td>
                        <Badge color={done ? 'info' : 'danger'} pill>
                          {done ? 'Done' : 'Undone'}
                        </Badge>
                      </td>
                      <td>
                        <div>
                          <Button
                            disabled={done}
                            outline
                            color="primary"
                            size="sm"
                            onClick={this.handleNavigation.bind(this, '/add-task', item)}>
                            Edit
                          </Button>{' '}
                          {!done ? (
                            <Button outline color="primary" size="sm" onClick={this.handleDone.bind(this, item)}>
                              Done
                            </Button>
                          ) : (
                            void 0
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          ) : (
            <div>No task added</div>
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    items: state.itemsReducer.items
  }
}
export default connect(mapStateToProps)(Home)
