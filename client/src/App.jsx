import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import Contact from "./Pages/Contact";
import PrivateRoute from "./Pages/PrivateRoute";
import Error from "./Pages/Error";
import AddListing from "./Pages/AddListing";
import AdminRoute from "./Pages/AdminRoute";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<PrivateRoute />}>
          <Route path="update/listing/:listingId" element={<UpdateListing />} />
          <Route path="/listing/:listingId" element={<Listing />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/createlisting" element={<AddListing />} />
        </Route>
        {/* */}

        <Route path="/contact" element={<Contact />} />
        <Route path="/error" element={<Error replace={false} />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
