import React, { useEffect, useState } from 'react'

export interface AppProps {
  prefixCls?: string
}

const App: React.FC<AppProps> = (props) => {
  const { prefixCls = 'app' } = props
  const [title, setTitle] = useState<string>('')
  useEffect(() => {
    setTitle('app demo2')
  }, [])
  return (
    <div className={prefixCls}>{ title }</div>
  )
}

export default App
