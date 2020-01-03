import React, { useContext, useState } from 'react'
import { ProviderContext, UPDATE_COLOR } from './provider'

export default function Control (props) {
  const { dispatch } = useContext(ProviderContext)
  const [color, setColor] = useState('red')

  const handleSwitch = () => {
    dispatch({ type: UPDATE_COLOR, color: 'red' })
  }

  const handleSwitchFn = () => {
    dispatch({ type: UPDATE_COLOR, color: 'blue' })
  }

  return (
    <React.Fragment>
      <button onClick={handleSwitch}>
        切换颜色1
      </button>
      <button onClick={handleSwitchFn}>
        切换颜色2
      </button>
    </React.Fragment>
  )
}