import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import AllRoutes from './routes/AllRoutes'
function App() {


  return (
    <>
      <Routes >
<Route path='/*' element={<AllRoutes/>}/>
    </Routes>
   
    </>
  )
}

export default App
