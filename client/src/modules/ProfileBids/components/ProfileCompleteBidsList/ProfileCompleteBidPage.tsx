import axios from "axios";
import { useState, useEffect } from "react";
import CompleteBid from "../../../../components/Bid/CompleteBid.tsx";
import { userId } from "../../../../constants/const.ts";
import NotFound from "../../../../ui/notFound/NotFound.tsx";

export type BidProfileType = {
  id: number;
  title: string;
  description: string;
  address: string;
  status: string;
  author_id: number;
};

export default function ProfileCompleteBidPage(): JSX.Element {
  const [completeBids, setCompleteBids] = useState<BidProfileType[]>([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/bids/complete`, {
      params: { userId },
    }).then((res) => setCompleteBids(res.data));
  }, []);

  return (
    <>
      <div className='flex justify-center'>
        {completeBids && completeBids.length ? (
          completeBids.map((bid) => {
            return <CompleteBid key={bid.id} bid={bid} />;
          })
        ) : (
          <NotFound label={"Пока что еще нет завершенных заявок!"} />
        )}
      </div>
    </>
  );
}
