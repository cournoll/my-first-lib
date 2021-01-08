import { useState, useEffect } from 'react'

const useDevice = () => {
  const checkDevice = () => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    return {
      desktop: mediaQuery.matches,
      mobile: !mediaQuery.matches
    }
  }
  const [state, setState] = useState(checkDevice())

  const updateDevice = () => {
    setState(checkDevice())
  }

  useEffect(() => {
    window.addEventListener('resize', updateDevice)
    return () => {
      window.removeEventListener('resize', updateDevice)
    }
    //eslint-disable-next-line
  }, [])

  return state
}

export default useDevice
