import React, { useRef, useState } from 'react'
import './detail.less'

export default function Detail (props) {
  const toggleRef = useRef()
  const [show, setShow] = useState(false)

  const handleToggle = () => {
    if (!show) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  return (
    <div id="wrapper" className={`wrapper ${show ? 'nav_transition' : ''}`} ref={toggleRef}>
      <div className="nav">
        <p>toggle</p>
      </div>
      <div className="nav__body" onClick={handleToggle}>
        66666
      </div>
    </div>
  )
}