import React from 'react'
import Provider from './provider'
import { Show } from './show'
import Control from './control'

export default function ContextDemo (props) {
  return (
    <Provider>
      <Show />
      <Control />
    </Provider>
  )
}