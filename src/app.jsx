import { useLoadedStory, LoadedContext } from '@/composables/useLoadedStory'
import LayoutTemplate from '@/templates/layout.template'

/**
 * App
 *
 * @param  {*} props.children
 * @param  {string} props.isPageType
 * @return {JSX.Element}
 */
const App = ({ children, isPageType = 'Page' }) => {
  const loadedStory = useLoadedStory()

  // クライアントサイドでのみ location を使用
  const location =
    typeof window !== 'undefined' ? window.location : { pathname: '/' }

  return (
    <LoadedContext.Provider value={loadedStory}>
      <LayoutTemplate location={location} isPageType={isPageType}>
        {children}
      </LayoutTemplate>
    </LoadedContext.Provider>
  )
}

export default App
