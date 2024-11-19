import { useAppSelector } from "../../../../hooks/redux.ts";
import { AppDispatch } from "../../../../redux/store/store.ts";
import { useEffect } from "react";
import { getBids } from "../store/feature/bidsSlice.ts";
import { getLikes } from "../store/feature/likeBidsSlice.ts";
import { userId } from "../../../shared/constants/const.ts";
import Bid from "../../../components/Bid/Bid/Bid.tsx";
import NotFound from "../../../shared/ui/notFound/NotFound.tsx";

interface ChildProps {
  dispatch: AppDispatch;
}

export function BidList({ dispatch }: ChildProps) {
  const bids = useAppSelector((state) => state.bids.filteredBids);

  useEffect(() => {
    dispatch(getBids());
    dispatch(getLikes());
  }, [dispatch]);

  return (
    <div className='flex flex-col items-center gap-y-5'>
      {bids && bids.length > 0 ? (
        bids.map((bid) => <Bid key={bid.id} bid={bid} userId={userId} />)
      ) : (
        <NotFound label={"Еще не создали ни одной заявки!"} />
      )}
    </div>
  );
}
