import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "~/state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Slider } from "@ff6wc/ui";

const Home: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  return (
    <div className="p-5">
      <Slider range defaultValue={[25, 75]} />
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <Button
        onClick={() =>
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true))
        }
      >
        {authState ? "Logout" : "LogIn"}
      </Button>
    </div>
  );
};

export default Home;
