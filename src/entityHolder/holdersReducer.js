export const holdersReducer = (state = {}, action) => {
  switch (action.type) {
    case '@entityHolder/RELEASE_ENTITY': {
      const currentWatcher = (state[action.payload] === undefined ? 0 : state[action.payload]) - 1
      let newState

      // delete watcher
      if (currentWatcher === 0) {
        const cloned = { ...state }
        delete cloned[action.payload]
        newState = cloned
      } else {
        // decrement
        newState = {
          ...state,
          [action.payload]: currentWatcher
        }
      }

      return newState
    }

    case '@entityHolder/RETRIEVE_ENTITY': {
      return {
        ...state,
        [action.payload]: (state[action.payload] === undefined ? 0 : state[action.payload]) + 1
      }
    }

    default:
      return state
  }
}