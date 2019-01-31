import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import { holdersReducer } from "../entityHolder/holdersReducer";
import { api } from "../api";

// Action creators
export const fetchEntities = () => ({ type: 'FETCH_ENTITIES' })
export const fetchEntitiesSuccess = (ids) => ({ type: 'FETCH_ENTITIES_SUCCESS', payload: ids })
export const fetchEntitySuccess = (item) => ({ type: 'FETCH_ENTITY_SUCCESS', payload: item })
export const removeEntity = (id) => ({ type: 'REMOVE_ENTITY', payload: id })

// Selectors
export const getEntity = (state, id) => state.entities.byId[id] || ({ id })
export const activeHolders = (state) => Object.keys(state.holders).length
export const hasHolder = (state, id) => state.holders[id] >= 1

const entityMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  next(action)

  /**
   * On FETCH_ENTITIES:
   * We simply fetch the list of ids for the example list
   */
  if (action.type === "FETCH_ENTITIES") {
    api.getIds().then(ids => dispatch(fetchEntitiesSuccess(ids)))
  }

  /**
   * On @entityHolder/RETRIEVE_ENTITY:
   * We will try to retrieve the entity from the api if it is
   * not already present in the state. This is our lazy loading
   */
  if (action.type === '@entityHolder/RETRIEVE_ENTITY') {
    if (getState().holders[action.payload] < 2) {
      api.getItem(action.payload).then(item => {
        // only register entity if it's still held (because of async)
        if (hasHolder(getState(), action.payload)) {
          dispatch(fetchEntitySuccess(item))
        }
      })
    }
  }
}

export const onReleaseStrategyMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  next(action)

  /**
   * On @entityHolder/RELEASE_ENTITY & not held
   * We remove the entity from the state
   */
  if (action.type === '@entityHolder/RELEASE_ENTITY' && !hasHolder(getState(), action.payload)) {
    dispatch(removeEntity(action.payload))
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

const rootReducer = combineReducers({
  entities: entitiesReducer,
  holders: holdersReducer
})

export const store = reduxCreateStore(rootReducer, applyMiddleware(
  entityMiddleware,
  onReleaseStrategyMiddleware,
))

global.store = store