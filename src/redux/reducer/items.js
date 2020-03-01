import ActionTypes from '../constants/ActionTypes'
import findIndex from 'lodash/findIndex'

const initialState = {
  items: [],
  itemsApiInProgress: false,
  totalItemCount: 1,
  filters: {
    search: '',
    limit: 20,
    skip: 0
  }
}

const setItemsLocalStorage = items => {
  localStorage.setItem('items', JSON.stringify(items))
}
const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ITEMS:
      return { ...state, itemsApiInProgress: true }
    case ActionTypes.GET_ITEMS_FAILURE:
      return { ...state, itemsApiInProgress: false }
    case ActionTypes.GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: [...state.items, ...action.payload.content],
        itemsApiInProgress: false,
        filters: {
          ...state.filters,
          skip: state.filters.skip + state.filters.limit
        }
      }
    case ActionTypes.UPDATE_ITEM: {
      const items = [...state.items],
        index = findIndex(state.items, item => item.id === action.payload.id)
      if (index !== -1) {
        items[index] = action.payload
        setItemsLocalStorage(items)
      }
      return {
        ...state,
        items: items
      }
    }
    case ActionTypes.CLEAR_DONE_ITEMS: {
      const items = state.items.filter(item => !item.done)
      setItemsLocalStorage(items)
      return {
        ...state,
        items: items
      }
    }

    case ActionTypes.ADD_ITEM: {
      const items = [action.payload, ...state.items]
      setItemsLocalStorage(items)
      return {
        ...state,
        items
      }
    }
    case ActionTypes.DELETE_ITEM: {
      const items = state.items.filter(item => item.id !== action.payload.id)
      setItemsLocalStorage(items)
      return {
        ...state,
        items
      }
    }
    case ActionTypes.CLEAR_ITEMS_LIST:
      return { ...state, items: [] }
    case ActionTypes.ITEMS_FILTER_CHANGE: {
      return { ...state, filters: { ...state.filters, ...action.payload } }
    }
    default:
      return state
  }
}

export default itemsReducer
