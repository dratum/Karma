import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { useEffect } from "react";
import BidResponse from "../../Bid/BidResponse.tsx";
import { getResponses } from "../../../../features/userResponseSlice.ts";
import { userId } from "../../../shared/constants/const.ts";

export default function ResponsesPage() {
  const dispatch = useAppDispatch();
  const responses = useAppSelector((state) => state.responseBid.bids);

  useEffect(() => {
    dispatch(getResponses());
  }, [dispatch]);

  return (
    <>
      <div className='flex justify-center '>
        <div className={"flex flex-col mt-10 gap-y-5 w-[1400px]"}>
          {responses && responses.length ? (
            responses.map((response) => (
              <BidResponse
                key={response.id}
                response={response}
                userId={userId}
              />
            ))
          ) : (
            <div
              className={"flex gap-x-5 justify-center items-center mt-[100px]"}
            >
              <img className='w-10' src='/svg/question.png' />
              <h1 className={"text-xl"}>Вы еще не откликнулись на заявки!</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
