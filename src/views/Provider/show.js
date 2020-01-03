import React, { useState, useEffect, useContext } from 'react'
import { ProviderContext } from './provider'

export const Show = (props) => {
  const { state } = useContext(ProviderContext) // 读取上下文
  return (
    <div style={{ color: state }}>颜色</div>
  )
}