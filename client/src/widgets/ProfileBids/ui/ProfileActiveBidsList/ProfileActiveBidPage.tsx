import { useEffect } from "react";
import ActiveBid from "../../../../components/Bid/ActiveBid.tsx";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux.ts";
import { getUserBids } from "../../../../../features/bidsUserSlice.ts";
import NotFound from "../../../../shared/ui/notFound/NotFound.tsx";

export function ProfileActiveBidPage(): JSX.Element {
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
          <NotFound label={"Вы еще не создали заявку!"} />
        )}
      </div>
    </>
  );
}
