import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import { holdersReducer } from "../entityHolder/holdersReducer";
import { api } from "../api";

// Action creators
export const fetchEntities = () => ({ type: 'FETCH_ENTITIES' })
export const fetchEntitiesSuccess = (ids) => ({ type: 'FETCH_ENTITIES_SUCCESS', payload: ids })
export const fetchEntitySuccess = (item) => ({ type: 'FETCH_ENTITY_SUCCESS', payload: item })
export const removeEntity = (id) => ({ type: 'REMOVE_ENTITY', payload: id })

// Selectors
export const getEntity = (state, id) => state.entities.byId[id] || {}
export const activeHolders = (state) => Object.keys(state.holders).length
export const hasHolder = (state, id) => state.holders[id] >= 1
export const thresholdReached = ({ retention }) => retention.stack.length > retention.threshold
export const thresholdLoad = ({ retention }) => retention.stack.length
export const thresholdContains = ({ retention }, id) => retention.stack.includes(id)

const entityMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  next(action)

  /**
   * On FETCH_ENTITIES:
   * We simply fetch the list of ids for the example list
   */
  if (action.type === "FETCH_ENTITIES") {
    api.getIds().then(ids => dispatch(fetchEntitiesSuccess(ids)))
  }

  if (action.type === 'ADD_THRESHOLD_ENTITY') {
    api.getItem(action.payload).then(item => {
      // only register entity if it's still held (because of async)
      if (thresholdContains(getState(), action.payload)) {
        dispatch(fetchEntitySuccess(item))
      }
    })
  }
}

/**
 * Strategy: Threshold
 */
export const onThresholdStrategyMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  next(action)

  const state = getState()

  if (action.type === '@entityHolder/RETRIEVE_ENTITY') {
    if (!state.retention.stack.includes(action.payload)) {
      dispatch({ type: "ADD_THRESHOLD_ENTITY", payload: action.payload })
    }
  }

  if (action.type === '@entityHolder/RELEASE_ENTITY') {
    // Threshold reached, try to do some cleanup
    if (thresholdReached(state) && activeHolders(state) < thresholdLoad(state)) {
      // Try to remove the first possible value
      const firstToRemove = state.retention.stack.find(id => !hasHolder(state, id))
      if (firstToRemove !== null) {
        dispatch(removeEntity(firstToRemove))
      }
    }
  }
}

const entitiesReducer = (state = { byId: {}, allIds: [] }, action) => {
  switch (action.type) {
    case 'REMOVE_ENTITY': {
      const cloned = { ...state.byId }
      delete cloned[action.payload]

      return {
        ...state,
        byId: cloned
      }
    }

    case 'FETCH_ENTITY_SUCCESS': {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      }
    }

    case 'FETCH_ENTITIES_SUCCESS':
      return {
        ...state,
        allIds: action.payload
      }
    default:
      return state
  }
}

const retentionReducer = (state = { stack: [], threshold: 15 }, action) => {
  switch (action.type) {
    // In case of retrieve, we need to cleanup the stack if needed
    case 'ADD_THRESHOLD_ENTITY': {
      return {
        ...state,
        stack: state.stack.concat(action.payload)
      }
    }

    case 'REMOVE_ENTITY': {
      return {
        ...state,
        stack: state.stack.filter(id => id !== action.payload)
      }
    }

    default: {
      return state
    }
  }
}

const rootReducer = combineReducers({
  retention: retentionReducer,
  entities: entitiesReducer,
  holders: holdersReducer
})

export const store = reduxCreateStore(rootReducer, applyMiddleware(
  entityMiddleware,
  onThresholdStrategyMiddleware,
))