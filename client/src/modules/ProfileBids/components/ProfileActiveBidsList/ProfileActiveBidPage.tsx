import { useEffect } from "react";
import ActiveBid from "../../../../components/Bid/ActiveBid.tsx";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux.ts";
import { getUserBids } from "../../../../../features/bidsUserSlice.ts";

function ProfileActiveBidPage(): JSX.Element {
  const bids = useAppSelector((state) => state.userBids.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserBids());
  }, [dispatch]);

  return (
    <>
      <div className='flex justify-center'>
        {bids && bids.length ? (
          bids.map((bid) => {
            return <ActiveBid key={bid.id} bid={bid} />;
          })
        ) : (
          <div
            className={
              "w-[60rem] flex gap-x-5 justify-center items-center mt-[100px]"
            }
          >
            <img className='w-10' src='/svg/question.png' />
            <h1 className={"text-xl"}>Вы еще не создали заявку!</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileActiveBidPage;
