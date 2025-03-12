import { Route,Routes } from 'react-router-dom'
import "./index.css"
import Login from './Pages/Login'
import Reset from './Pages/Reset'
 import AddCustomer from './Pages/AddCustomer'
import AddSupplier from './Pages/AddSupplier'
function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<Login/>} /> 
      <Route path='/reset' element={<Reset/>} />
        <Route path='/customer' element={<AddCustomer />} /> 
        <Route path='/add' element ={<AddSupplier/>} />
              </Routes>
      </>
  )
}

export default App
