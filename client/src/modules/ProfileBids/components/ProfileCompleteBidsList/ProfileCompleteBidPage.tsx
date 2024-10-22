import axios from "axios";
import { useState, useEffect } from "react";
import CompleteBid from "../../../../components/Bid/CompleteBid.tsx";
import { userId } from "../../../../constants/const.ts";

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
        <div className={"flex flex-col mt-10 gap-y-5 w-[1400px]"}>
          {completeBids && completeBids.length ? (
            completeBids.map((bid) => {
              return <CompleteBid key={bid.id} bid={bid} />;
            })
          ) : (
            <div className={"flex w-[60rem] gap-x-5 items-center"}>
              <img className='w-10' src='/svg/question.png' />
              <h1 className={"text-xl"}>
                Пока что еще нет завершенных заявок!
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
