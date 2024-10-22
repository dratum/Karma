import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux.ts";
import { useEffect } from "react";
import { getUserBidsProgress } from "../../../../../features/bidsUserSlice.ts";
import BidProgress from "../../../../components/Bid/BidInProgress.tsx";
import NotFound from "../../../../ui/notFound/NotFound.tsx";

function ProfileProgressBidPage(): JSX.Element {
  const bids = useAppSelector((state) => {
    return state.userBids.list;
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserBidsProgress());
  }, [dispatch]);

  return (
    <>
      <div className='flex justify-center '>
        {bids && bids.length ? (
          bids.map((bid) => {
            return <BidProgress key={bid.id} bid={bid} />;
          })
        ) : (
          <NotFound
            label={"Пока что еще нет заявок на которые откликнулись!"}
          />
        )}
      </div>
    </>
  );
}

export default ProfileProgressBidPage;
