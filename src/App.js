import React from 'react'
import Navbar from './components/Navbar'

const App = ({children}) => (
  <div className="container-fluid">
    <Navbar/>
    {children}
  </div>
)

export default App
