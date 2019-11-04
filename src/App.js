import React from 'react';
// import logo from './logo.svg';
import './App.less';
import Button from '@/components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <Button buttonText="你确定？？？"/> */}
        <Button buttonText="你确定？？？"></Button>
      </header>
    </div>
  );
}

export default App
