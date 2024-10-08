import { useAppSelector } from "../../../../hooks/redux.ts";
import { AppDispatch } from "../../../../redux/store/store.ts";
import { useEffect } from "react";
import { getBids } from "../../../pages/BidsListPage/store/feature/bidsSlice.ts";
import { getLikes } from "../store/features/likeBidsSlice.ts";
import { userId } from "../../../constants/const.ts";
import Bid from "../../../components/Bid/Bid/Bid.tsx";
import NotFound from "../../../ui/notFound/NotFound.tsx";

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
    <div className='flex flex-col gap-y-5'>
      {bids && bids.length > 0 ? (
        bids.map((bid) => <Bid key={bid.id} bid={bid} userId={userId} />)
      ) : (
        <NotFound />
      )}
    </div>
  );
}
