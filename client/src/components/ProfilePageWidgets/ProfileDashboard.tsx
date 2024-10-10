import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../../../features/userActivitySlice.ts";
import { RootState } from "../../../redux/store/store.ts";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import NavBar from "./NavBar.tsx";

import { userId } from "../../constants/const.ts";

import { getUser } from "../../../features/getUserSlice.ts";
import UserDataWidget from "./components/userDataWidget/UserDataWidget.tsx";
import UserScoresWidget from "./components/userScoresWidget/UserScoresWidget.tsx";
import UserChartWidget from "./components/userChartWidget/UserChartWidget.tsx";

function ProfileBioPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const totalOrders = useSelector(
    (state: RootState) => state.activity.totalOrders
  );
  const completedOrders = useSelector(
    (state: RootState) => state.activity.completedOrders
  );
  console.log(totalOrders, completedOrders);

  useEffect(() => {
    dispatch(getOrders(userId));
    dispatch(getUser(userId));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div
        className={
          "flex flex-col gap-y-4 items-center justify-evenly mt-12 lg:flex-row"
        }
      >
        <UserDataWidget user={user} />
        <UserScoresWidget user={user} />
        <UserChartWidget
          totalOrders={totalOrders}
          completedOrders={completedOrders}
        />
      </div>
    </>
  );
}

export default ProfileBioPage;
