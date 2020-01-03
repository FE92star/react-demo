import React, { useState, createContext, useReducer } from 'react'

export const ProviderContext = createContext({}) // 创建上下文

export const UPDATE_COLOR = 'UPDATE_COLOR'

export default function Provider (props) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch(action.type) {
        case 'UPDATE_COLOR': 
          return action.color
        default:
          return state
      }
    }, 'blue'
  )
  return (
    <ProviderContext.Provider value={{ state, dispatch }}>
      { props.children }
    </ProviderContext.Provider>
  )
}