import React from 'react'
import { INSIDE, BELOW } from './constants'
import onNextTick from './OnNextTick'

// Calls a function when you scroll to the element.
class TopWaypoint extends React.PureComponent {
  constructor(props) {
    super(props)

    this.node = React.createRef()
  }

  componentDidMount() {
    // this._ref may occasionally not be set at this time. To help ensure that
    // this works smoothly and to avoid layout thrashing, we want to delay the
    // initial execution until the next tick.
    this.cancelOnNextTick = onNextTick(() => {
      this.cancelOnNextTick = null

      this.scrollableAncestor = this._findScrollableAncestor()

      this.scrollableAncestor.addEventListener('scroll', this._handleScroll, {
        passive: true,
      })

      window.addEventListener('resize', this._handleScroll, {
        passive: true,
      })

      this._handleScroll(null)
    })
  }

  componentDidUpdate() {
    if (!this.scrollableAncestor) {
      // The Waypoint has not yet initialized.
      return
    }

    // The element may have moved, so we need to recompute its position on the
    // page. This happens via handleScroll in a way that forces layout to be
    // computed.
    //
    // We want this to be deferred to avoid forcing layout during render, which
    // causes layout thrashing. And, if we already have this work enqueued, we
    // can just wait for that to happen instead of enqueueing again.
    if (this.cancelOnNextTick) {
      return
    }

    this.cancelOnNextTick = onNextTick(() => {
      this.cancelOnNextTick = null
      this._handleScroll(null)
    })
  }

  componentWillUnmount() {
    if (this.scrollableAncestor) {
      this.scrollableAncestor.removeEventListener('scroll', this._handleScroll)
    }
    window.removeEventListener('resize', this._handleScroll)

    if (this.cancelOnNextTick) {
      this.cancelOnNextTick()
    }
  }

  /**
   * Traverses up the DOM to find an ancestor container which has an overflow
   * style that allows for scrolling.
   *
   * @return {Object} the closest ancestor element with an overflow style that
   *   allows for scrolling. If none is found, the `window` object is returned
   *   as a fallback.
   */
  _findScrollableAncestor() {
    const { scrollableAncestor } = this.props

    if (scrollableAncestor) {
      return scrollableAncestor
    }

    let node = this.node.current

    while (node.parentNode) {
      node = node.parentNode

      if (node === document.body) {
        // We've reached all the way to the root node.
        return window
      }

      const style = window.getComputedStyle(node)
      const overflowDirec = style.getPropertyValue('overflow-y')
      const overflow = overflowDirec || style.getPropertyValue('overflow')

      if (overflow === 'auto' || overflow === 'scroll') {
        return node
      }
    }

    // A scrollable ancestor element was not found, which means that we need to
    // do stuff on window.
    return window
  }

  _handleScroll = () => {
    if (!this.node || !this.node.current) {
      // There's a chance we end up here after the component has been unmounted.
      return
    }

    const scrollableParentOffsetTop =
      this.scrollableAncestor === window
        ? window.scrollY
        : this.scrollableAncestor.scrollTop

    let currentPosition
    if (scrollableParentOffsetTop < 2000) {
      currentPosition = INSIDE
    } else {
      currentPosition = BELOW
    }

    const previousPosition = this._previousPosition

    const { onEnter } = this.props

    // Save previous position as early as possible to prevent cycles
    this._previousPosition = currentPosition

    if (previousPosition === currentPosition) {
      // No change since last trigger
      return
    }

    if (currentPosition === INSIDE) {
      onEnter()
    }
  }

  /**
   * @return {Object}
   */
  render() {
    return <div style={{ height: 1 }} ref={this.node} />
  }
}

export default TopWaypoint
