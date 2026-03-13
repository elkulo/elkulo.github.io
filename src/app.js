import React from 'react'
import { useLoadedStory, LoadedContext } from '@/composables/useLoadedStory'

/**
 * App
 *
 * @param  {*} props.children
 * @return {JSX.Element}
 */
const App = ({ children }) => {
  const loadedStory = useLoadedStory()

  return (
    <LoadedContext.Provider value={loadedStory}>
      {children}
    </LoadedContext.Provider>
  )
}

export default App
