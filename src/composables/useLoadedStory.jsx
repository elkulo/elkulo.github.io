import { createContext, useReducer } from 'react'

// 初期値.
const init = {
  loaded: {
    is: false,
  },
}

// コンテキスト.
export const LoadedContext = createContext(init.loaded)

// アクション.
export const useLoadedStory = () => {
  const [loadedState, loadedDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'end':
        return { ...state, is: true } // ロード済みに変更.

      default:
        return state
    }
  }, init.loaded)

  return [loadedState, loadedDispatch]
}
