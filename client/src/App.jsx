import { Route, Routes } from 'react-router-dom'
import "./index.css"
import Login from './Pages/Login'
import Reset from './Pages/Reset'
// import Sample from './Pages/sample'
import AddCustomer from './Pages/AddCustomer'
import AddSupplier from './Pages/AddSupplier'
import Employe from './Pages/Employe'
import Va from './Pages/Va'
import AddItem from './Pages/AddItem'
import Email from './Pages/Email'
import AddCommission from './Pages/AddCommission'
import AddExpense from './Pages/AddExpense'
import AddCompany from './Pages/AddCompany'
import Otp from './Pages/Otp'
function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/additem' element={<AddItem />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/email' element={<Email />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/commission' element={<AddCommission />} />
        <Route path='/company' element={<AddCompany />} />
        <Route path='/expense' element={<AddExpense />} />
        <Route path='/item' element={<AddItem />} />
        <Route path='/employe' element={<Employe />} />
        {/* <Route path='/sample' element={<Sample />} /> */}
        <Route path='/customer' element={<AddCustomer />} />
        <Route path='/addsupplier' element={<AddSupplier />} />
        <Route path='/va' element={<Va />} />
      </Routes>
    </>
  )
}

export default App
