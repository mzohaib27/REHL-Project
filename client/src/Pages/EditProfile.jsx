import React, { useRef, useState } from "react";
import { Styles } from "../constants/Styles";
import { useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserFailed,
  updateUserSuccess,
  updateUserStart,
} from "../Redux/user/userSlice";

const EditProfile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});

  //   initializing of useDispatch
  const dispatch = useDispatch();
  // initializing Navigation
  const navigate = useNavigate();

  //   Handle Profile Info
  const handleProfileInfo = (e) => {
    e.preventDefault();
  };

  const fileRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // HandleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Testing....

      // Real Code.....

      dispatch(updateUserStart());
      const res = await fetch(`/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(formData),
      });
      const resp = res.json();
      console.log("Response is ... " + resp);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailed(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      navigate("/singin");
      console.log("user update success.." + data);
    } catch (error) {
      dispatch(updateUserFailed(error));
      navigate("/error");
      console.log("user update failed error is " + error);
    }
  };
  return (
    <div
      className={`${Styles.paddingX} ${Styles.paddingY} flex flex-col items-center justify-center bg-gray-100 h-[90vh]`}
    >
      <h1 className="text-2xl md:text-4xl font-bold py-4">Edit Profile</h1>

      <div className="flex flex-col w-[25rem] bg-gray-300 rounded-lg px-6 py-6 space-y-2 shadow-xl">
        {" "}
        <form onSubmit={handleSubmit}>
          <div className="flex relative py-4 justify-center">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="images/*"
            />
            <img
              src={currentUser.photo}
              className="w-32 h-32 rounded-full items-center"
            />
            <div
              className="absolute bottom-4 right-24"
              onClick={() => fileRef.current.click()}
            >
              <button>
                <CiCirclePlus className="w-8 h-8 text-white bg-blue-700 rounded-full" />
              </button>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-lg">Edit Username</h1>
            <input
              id="username"
              placeholder="Edit Username"
              className={`px-4 py-2 rounded-lg w-full focus:outline-none`}
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Edit email</h1>
            <input
              id="email"
              placeholder="Edit Email"
              className={`px-4 py-2 rounded-lg w-full focus:outline-none`}
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <h1 className="font-semibold text-lg">Edit Password</h1>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className={`px-4 py-2 rounded-lg w-full focus:outline-none`}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={loading}
            type="Submit"
            className="text-white w-full hover:bg-blue-800 trans-eff bg-blue-700 rounded-lg px-4 py-2 my-4"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
        <div className="flex space-x-8">
          <div className="flex space-x-2">
            <Link to={"/profile"}>
              <button className="hover:underline hover:text-blue-600 trans-eff">
                Go Back to Profile Page
              </button>
            </Link>
          </div>
          <div>
            <Link to={"/"}>
              <button className="hover:underline hover:text-blue-600 trans-eff">
                Go Home Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
