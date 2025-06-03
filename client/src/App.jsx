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
import AddLender from "./Pages/AddLender";
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
import Expenses from "./Pages/Expenses";
import IndividualReports from "./Pages/IndividualReports";
import SalesTransaction from "./Pages/SalesTransaction";
import Sales from "./Pages/Sales";
import Cashbook from "./Pages/Cashbook";
import PurchaseReport from "./Pages/PurchaseReport";
import Dashboard from "./Pages/Dashboard";
import PersistLogin from "./Components/PersistLogin";
import RequireAuth from "./Components/RequireAuth";
import IndividualSales from "./Pages/IndividualSales";
import { ToastContainer } from "react-toastify";
import TrialBalance from "./Pages/TrialBalance";
// import Whatsapp from "./Pages/Whatsapp";
import Payment from "./Pages/Payment/Payment";
import AddPayment from "./Pages/Payment/AddPayment";
import LocalsalesReport from "./Pages/LocalsalesReport";
import EditPurchaseTransaction from "./Pages/purchase/EditPurchaseTransaction";
import EditCustomerModal from "./Pages/EditCustomer";
import EditCustomer from "./Pages/EditCustomer";
import EditCommission from "./Pages/EditCommission";
import EditCompany from "./Pages/EditCompany";
import EditEmployee from "./Pages/EditEmployee";
import EditItem from "./Pages/EditItem";
import EditSupplier from "./Pages/EditSupplier";
import Lender from "./Pages/Lender";
import DailySalesReport from "./Pages/DailySalesReport";
import AddPickup from "./Pages/AddPickup";
import Report from "./Pages/Report";
import Vehicle from "./Pages/Vehicle";
import ErrorBoundary from "./Components/ErrorBoundary";
import NotFound from "./Pages/NotFound";
import CustomerReports from "./Pages/CustomerReports";
function App() {
  return (
    <>
      <ErrorBoundary>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/mastercustomer" element={<Customer />} />
                <Route path="/route-customer" element={<Routecustomer />} />
                <Route path="/supplier" element={<Supplier />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/item" element={<Item />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/lender" element={<Lender />} />

                <Route path="/commission" element={<Commission />} />
                <Route path="/company" element={<Company />} />
                <Route
                  path="/purchase-transaction"
                  element={<Purchasetransaction />}
                />
                <Route
                  path="/edit-puchase/:id"
                  element={<EditPurchaseTransaction />}
                />
                <Route
                  path="/sales-transaction"
                  element={<SalesTransaction />}
                />
                {/* <Route path='/sales/:id' element={<Sales />} /> */}
                <Route path="/payment/:type" element={<Payment />} />

                <Route path="/cashbook" element={<Cashbook />} />
                <Route path="/purchase-report" element={<PurchaseReport />} />
                <Route
                  path="/individual-report"
                  element={<IndividualReports />}
                />
                <Route
                  path="/localsales-report"
                  element={<LocalsalesReport />}
                />
                <Route path="/customer-reports" element={<CustomerReports />} />
                <Route path="/dailysales" element={<DailySalesReport />} />
                <Route path="/trail" element={<TrialBalance />} />
                <Route path="/individualsales" element={<IndividualSales />} />
                <Route path="/vehicle" element={<Vehicle />} />
                <Route path="/report" element={<Report />} />

                {/* <Route path='/whatsapp' element={<Whatsapp />} /> */}

                <Route
                  path="/updatecustomer/:id"
                  element={<EditCustomerModal />}
                />
              </Route>
            </Route>
          </Route>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/add-commission" element={<AddCommission />} />
          <Route path="/add-company" element={<AddCompany />} />
          <Route path="/expense" element={<AddExpense />} />

          <Route path="/add-employe" element={<Addemploye />} />
          <Route
            path="/purchase-transaction"
            element={<Purchasetransaction />}
          />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/company" element={<Company />} />
          <Route path="/edit-customer/:id" element={<EditCustomer />} />
          <Route path="/edit-commission" element={<EditCommission />} />
          <Route path="/edit-company" element={<EditCompany />} />
          <Route path="/edit-employee" element={<EditEmployee />} />
          <Route path="/edit-item" element={<EditItem />} />
          <Route path="/edit-supplier" element={<EditSupplier />} />
          <Route path="/add-lender" element={<AddLender />} />
          <Route path="/add-pickup" element={<AddPickup />} /> */}

          <Route path="/sales/:id" element={<Sales />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
