import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../../../../features/userActivitySlice.ts";
import { RootState } from "../../../../redux/store/store.ts";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { userId } from "../../../shared/constants/const.ts";
import { getUser } from "../../../../features/userEditProfileSlice.ts";
import {
  UserChartWidget,
  UserDataWidget,
  UserScoresWidget,
} from "../../../components/ProfilePageWidgets/index.ts";

export default function ProfileDashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userEdit.user);
  const totalOrders = useSelector(
    (state: RootState) => state.activity.totalOrders
  );
  const completedOrders = useSelector(
    (state: RootState) => state.activity.completedOrders
  );

  useEffect(() => {
    dispatch(getOrders(userId));
    dispatch(getUser(userId));
  }, [dispatch]);

  return (
    <>
      <div
        className={
          "flex flex-row flex-wrap md:flex-nowrap gap-y-4 items-center justify-around mt-12"
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
