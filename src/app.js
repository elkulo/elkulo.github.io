import React from 'react'
import { LoadedStory } from '@/story/contexts'

/**
 * App
 *
 * @param  {*} props.children
 * @return {JSX.Element}
 */
const App = ({ children }) => <LoadedStory>{children}</LoadedStory>

export default App
