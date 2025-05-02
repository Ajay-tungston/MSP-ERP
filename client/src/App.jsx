import { Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./Pages/Login";

import AddCustomer from "./Pages/AddCustomer";
import AddSupplier from "./Pages/AddSupplier";
import Addemploye from "./Pages/Addemploye";
import AddItem from "./Pages/AddItem";
import AddCommission from "./Pages/AddCommission";
import AddExpense from "./Pages/AddExpense";
import AddCompany from "./Pages/AddCompany";
import Otp from "./Pages/Otp";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import Layout from "./Components/Layout";
import Customer from "./Pages/Customer";
import Supplier from "./Pages/Supplier";
import Employee from "./Pages/Employee";
import Routecustomer from "./Pages/Routecustomer";
import Purchasetransaction from "./Pages/Purchasetransaction";
import Company from "./Pages/Company";
import Commission from "./Pages/Commission";
import Item from "./Pages/Item";
import RouteExpense from "./Pages/RouteExpense";
import IndividualReports from "./Pages/IndividualReports";
import SalesTransaction from "./Pages/SalesTransaction";
import Sales from "./Pages/Sales";
// import Sample from './Pages/Sample'
import Cashbook from "./Pages/Cashbook";
import PurchaseReport from "./Pages/PurchaseReport";
import Dashboard from "./Pages/Dashboard";
import PersistLogin from "./Components/PersistLogin";
import RequireAuth from "./Components/RequireAuth";
import LocalsalesReport from "./Pages/LocalsalesReport";
import EditCustomerModal from "./Pages/EditCustomer";
import TrialBalance from "./Pages/TrialBalance";
import Whatsapp from "./Pages/Whatsapp";
import Payment from "./Pages/Payment/Payment";
import AddPayment from "./Pages/Payment/AddPayment";
import IndividualSales from "./Pages/IndividualSales";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/mastercustomer" element={<Customer />} />
          <Route path="/route-customer" element={<Routecustomer />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/employee" element={<Employee />} />
          <Route
            path="/purchase-transaction"
            element={<Purchasetransaction />}
          />

          <Route path='/commission' element={<Commission />} />
          <Route path='/item' element={<Item />} />
          <Route path='/route-expense' element={<RouteExpense />} />
          <Route path='/individual-report' element={<IndividualReports />} />
          <Route path='/sales-transaction' element={<SalesTransaction />} />
          <Route path='/sales/:id' element={<Sales />} />
          <Route path='/cashbook' element={<Cashbook />} />
          <Route path='/purchase-report' element={<PurchaseReport />} />
          <Route path='/localsales-report' element={<LocalsalesReport />} />
          <Route path='/whatsapp' element={<Whatsapp />} />
          <Route path="/trail" element={<TrialBalance />}/>
          <Route path="/individualsales" element={<IndividualSales/>}/>
        </Route>

        <Route path="/sales" element={<Sales />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/add-commission" element={<AddCommission />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/expense" element={<AddExpense />} />
        <Route path="/add-employe" element={<Addemploye />} />
        <Route path="/purchase-transaction" element={<Purchasetransaction />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/add-supplier" element={<AddSupplier />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/mastercustomer" element={<Customer />} />
              <Route path="/route-customer" element={<Routecustomer />} />
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/payment/:type" element={<Payment />} />
              <Route path="/company" element={<Company />} />
              <Route path="/commission" element={<Commission />} />
              <Route path="/item" element={<Item />} />
              <Route path="/route-expense" element={<RouteExpense />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/add-commission" element={<AddCommission />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/expense" element={<AddExpense />} />
        <Route path="/add-employe" element={<Addemploye />} />
        <Route path="/purchase-transaction" element={<Purchasetransaction />} />
        <Route path="/updatecustomer/:id" element={<EditCustomerModal />} />
        {/* <Route path="/add-supplier" element={<AddSuppconsole.log('App component rendered');lier />} /> */}
        <Route path="/company" element={<Company />} />
        <Route path="/trail" element={<TrialBalance />} />
        {/* <Route path="/add-payment" element={<AddPayment />} /> */}
      </Routes>
    </>
  );
}

export default App;
