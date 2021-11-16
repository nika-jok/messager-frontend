import { useCallback, useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import TopWaypoint from './TopWayPoint'
import BottomWayPoint from './BottomWayPoint'

const ERRORS_THRESHOLD = 50
const THRESHOLD_TIME = 180000

function InfiniteWaypoint({
  device,
  onEnter,
  className,
  content,
  bottomOnly,
  totalPages,
  currentPage,
  direction,
  ...props
}) {
  const [errorsCount, setErrorsCount] = useState(0)
  const thresholdTimer = useRef(null)

  const clearTimer = useCallback(() => {
    clearTimeout(thresholdTimer.current)
    thresholdTimer.current = null
  }, [])

  const resetErrors = useCallback(() => {
    setErrorsCount(0)
    Promise.resolve().then(() => {
      clearTimer()
    })
  }, [clearTimer])

  useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [clearTimer])

  const handleEnter = useCallback(() => {
    if (!onEnter) {
      return
    }

    if (errorsCount > ERRORS_THRESHOLD) {
      console.error(
        `Too much errors (${errorsCount}) on infinite load.
        Prevent propagation and suppress next requests.`
      )

      if (!thresholdTimer.current) {
        thresholdTimer.current = setTimeout(() => {
          resetErrors()
        }, THRESHOLD_TIME)
      }

      return
    }

    return onEnter()
      .then((res) => {
        const isError = res.status >= 400

        if (isError) {
          setErrorsCount(errorsCount + 1)
        }

        if (!isError) {
          resetErrors()
        }

        return res
      })
      .catch((error) => {
        setErrorsCount(errorsCount + 1)
      })
  }, [errorsCount, onEnter, resetErrors])

  if (direction === 'bottom') {
    return <BottomWayPoint content={content} onEnter={handleEnter} />
  } else {
    return <TopWaypoint content={content} onEnter={handleEnter} />
  }
}

export default InfiniteWaypoint
