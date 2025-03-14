import { Route, Routes } from 'react-router-dom'
import "./index.css"
import Login from './Pages/Login'
import Reset from './Pages/Reset'
// import Sample from './Pages/sample'
import AddCustomer from './Pages/AddCustomer'
import AddSupplier from './Pages/AddSupplier'
// import Supplier from './Pages/Supplier'
import Employe from './Pages/Employe'
// import Sa from './Pages/Sa'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset' element={<Reset />} />
        {/* <Route path='/sa' element={<Sa />} /> */}
        <Route path='/employe' element={<Employe />} />
        {/* <Route path='/sample' element={<Sample />} /> */}
        <Route path='/customer' element={<AddCustomer />} />
        <Route path='/add' element={<AddSupplier />} />
        {/* <Route path='/supplier' element={<Supplier/>} /> */}
      </Routes>
    </>
  )
}

export default App
