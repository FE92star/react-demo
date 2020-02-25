import React, { useState, useEffect } from 'react'

export default function HomePage(props) {
  const [home, setHome] = useState('HOMEPAGE')
  useEffect(() => {
    setHome('Homepage')
  }, [])
  return (
    <div>{ home }</div>
  )
}