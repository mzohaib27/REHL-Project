import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import Contact from "./Pages/Contact";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./Pages/PrivateRoute";
import EditProfile from "./Pages/EditProfile";
import Error from "./Pages/Error";
import AddListing from "./Pages/AddListing";
import AdminRoute from "./Pages/AdminRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminRoute />} />
        </Route>
        {/* */}
        <Route path="/createlisting" element={<AddListing />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/error" element={<Error replace={false} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
