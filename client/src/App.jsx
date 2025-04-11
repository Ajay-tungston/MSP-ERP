import { Route, Routes } from 'react-router-dom'
import "./index.css"
import Login from './Pages/Login'
// import Sample from './Pages/sample'
import AddCustomer from './Pages/AddCustomer'
import AddSupplier from './Pages/AddSupplier'
import Employe from './Pages/Employe'
import Va from './Pages/Va'
import AddItem from './Pages/AddItem'
import AddCommission from './Pages/AddCommission'
import AddExpense from './Pages/AddExpense'
import AddCompany from './Pages/AddCompany'
// import Otp from './Pages/Otp'
import ForgetPassword from './Pages/ForgetPassword'
import ResetPassword from './Pages/ResetPassword'
function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/additem' element={<AddItem />} />
        {/* <Route path='/otp' element={<Otp />} /> */}
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
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
