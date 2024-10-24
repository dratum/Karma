import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { useEffect } from "react";
import BidResponse from "../../../components/Bid/BidResponse.tsx";
import { getResponses } from "../../../../features/userResponseSlice.ts";
import { userId } from "../../../constants/const.ts";
import NotFound from "../../../ui/notFound/NotFound.tsx";

export default function UserResponsesList() {
  const dispatch = useAppDispatch();
  const responses = useAppSelector((state) => state.responseBid.bids);

  useEffect(() => {
    dispatch(getResponses());
  }, [dispatch]);

  return (
    <>
      <div className='flex justify-center'>
        <div className={"flex flex-col mt-10 gap-y-5 w-[60rem]"}>
          {responses && responses.length ? (
            responses.map((response) => (
              <BidResponse
                key={response.id}
                response={response}
                userId={userId}
              />
            ))
          ) : (
            <NotFound label='Вы еще не откликнулись на заявки!' />
          )}
        </div>
      </div>
    </>
  );
}
