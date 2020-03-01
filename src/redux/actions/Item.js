import ActionTypes from '../constants/ActionTypes'

export const getItems = () => {
  return {
    type: ActionTypes.GET_ITEMS
  }
}

export const clearItems = () => {
  return {
    type: ActionTypes.CLEAR_ITEMS_LIST
  }
}

export const clearDoneItems = () => {
  return {
    type: ActionTypes.CLEAR_DONE_ITEMS
  }
}

export const itemsFilterChange = payload => ({
  type: ActionTypes.ITEMS_FILTER_CHANGE,
  payload
})

export const addItem = payload => ({
  type: ActionTypes.ADD_ITEM,
  payload
})

export const updateItem = payload => ({
  type: ActionTypes.UPDATE_ITEM,
  payload
})

export const deleteItem = payload => ({
  type: ActionTypes.DELETE_ITEM,
  payload
})
