import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Styles } from "../constants/Styles";
import Btn from "../Components/Btn";
import { useDispatch } from "react-redux";
import {
  signOutStart,
  signOutFailed,
  signOutSuccess,
  deleteUserStart,
  deleteUserFailed,
  deleteUserSuccess,
} from "../Redux/user/userSlice";
import { fetchWithBaseURL } from "../utils/fetch-url";

const Profile = () => {
  // Accessing Redux State By useSelector
  const { currentUser } = useSelector((state) => state.user);

  // initializing UseDispatch
  const dispatch = useDispatch();

  // SignOut Function
  const SignOutBtnHandler = async (e) => {
    e.preventDefault();
    dispatch(signOutStart());
    try {
      // const res = await fetchWithBaseURL("server/auth/signout");
      const res = await fetch("http://localhost:8000/server/auth/signout");
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signOutFailed(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
      res.status(200).json(data);
    } catch (error) {
      dispatch(signOutFailed(data.message));
      console.log("Error happened while logout Err : " + error);
    }
  };

  // Delete Function
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = fetchWithBaseURL(`server/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = (await res).json();
      if (data.success === false) {
        dispatch(deleteUserFailed(data.message));
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {}
  };

  // Return Statement (JSX)
  return (
    <div
      className={`${Styles.paddingX} ${Styles.paddingY} w-full h-screen items-center justify-center bg-gray-50`}
    >
      <h1 className={`${Styles.HdTxt} italic text-center py-6`}>
        User Profile
      </h1>
      <div
        className={`shadow-xl flex flex-col mx-auto px-6 py-12 bg-gray-300 rounded-lg items-center justify-center space-y-2 h-auto w-96`}
      >
        <div>
          <img src={currentUser.photo} className={`w-32 h-32 rounded-full`} />
        </div>
        <h1 className={`${Styles.HdTxt}`}>{currentUser.username}</h1>
        <h1 className={`${Styles.BaseTxt}`}>{currentUser.email}</h1>
        <div className="w-full">
          <Link to={"/profile/edit"}>
            <Btn type="Edit Profile" />
          </Link>
        </div>

        <button
          onClick={SignOutBtnHandler}
          className="rounded-lg w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 tran-eff "
        >
          Sign Out
        </button>
        <Link to={"/"}>
          <button className="hover:underline hover:text-blue-700 trans-eff">
            Go Back to Home Page
          </button>
        </Link>
        <button
          onClick={handleDeleteUser}
          className="hover:underline hover:text-blue-700 trans-eff "
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
