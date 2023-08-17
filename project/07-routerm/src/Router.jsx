import { EVENTS } from './consts'
import { useState, useEffect } from 'react'
import { match } from 'path-to-regexp'

export function Router ({ routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener(EVENTS.pushState, onLocationChange)
    window.addEventListener(EVENTS.popState, onLocationChange)
    return () => {
      window.removeEventListener(EVENTS.pushState, onLocationChange)
    }
  }, [])

  let routeParams = {}

  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true

    // we have used path-to-regexp para poder
    // detectar rutas dinamicas como por ejemplo
    /// search/:query <- :query es una ruta dinámica
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    // guardar los parámetros de la url que eran dinámicos
    // y que hemos extraído con path-to-regexp
    // por ejemplo, si la ruta es /search/:query
    // y la url es /search/javascript
    // matched.params.query === 'javascript'
    routeParams = matched.params
    return true
  })?.Component || DefaultComponent

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}
