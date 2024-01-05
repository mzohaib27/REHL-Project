//

// Butt Code...
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailed } from "../Redux/user/userSlice";
import { fetchWithBaseURL } from "../utils/fetch-url";
import { backendPort } from "../utils/fetch-url";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:7000/server/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="bg-red-600 hover:bg-red-700 trans-eff w-full text-white rounded-lg py-2 px-4"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Oauth;
