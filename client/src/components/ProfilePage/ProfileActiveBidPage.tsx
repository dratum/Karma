import { useEffect } from "react";
import ProfileBidPage from "./ProfileBidPage.tsx";
import ActiveBid from "../Bid/ActiveBid.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import { getUserBids } from "../../../features/bidsUserSlice.ts";

function ProfileActiveBidPage(): JSX.Element {
  const bids = useAppSelector((state) => state.userBids.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserBids());
  }, [dispatch]);

  return (
    <>
      <ProfileBidPage />
      <div className='flex justify-center '>
        <div className={" flex flex-col mt-10 gap-y-5 w-[1400px]"}>
          {bids && bids.length ? (
            bids.map((bid) => {
              return <ActiveBid key={bid.id} bid={bid} />;
            })
          ) : (
            <div
              className={"flex gap-x-5 justify-center items-center mt-[100px]"}
            >
              <img className='w-10' src='/svg/question.png' />
              <h1 className={"text-xl"}>Вы еще не создали заявку!</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileActiveBidPage;
