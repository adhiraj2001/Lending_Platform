import { BrowserRouter, Routes, Route, Outlet, Redirect } from "react-router-dom";
import "./App.css";

import Requests_List from "./components/common/Requests_List";

import Home from "./components/common/Home";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Add_Request from "./components/common/Add_Request";
import User_Requests from "./components/common/User_Requests";
import Lender_Transactions from "./components/common/Lender_Transactions";
import Borrower_Transactions from "./components/common/Borrower_Transactions";

import Navbar from "./components/templates/Navbar";
// import Profile from "./components/users/Profile";

import ls from "local-storage";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
      <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route exact path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />

          {/* <Route path="users" element={<UsersList />} /> */}
          <Route path="requests_list" element={<Requests_List />} />
          <Route path="add_request" element={<Add_Request />} />
          <Route path="user_requests" element={<User_Requests />} />
          <Route path="lender_transactions" element={<Lender_Transactions />} />
          <Route path="borrower_transactions" element={<Borrower_Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
