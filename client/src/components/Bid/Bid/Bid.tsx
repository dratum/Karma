import { BidType } from "../../../../src/pages/BidsListPage/store/feature/bidsSlice.ts";
import { responseUserBid } from "../../../../features/userResponseSlice.ts";
import { useAppDispatch } from "../../../../hooks/redux.ts";
import ButtonResponse from "../../ButtonResponse/ButtonResponse.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store.ts";
import {
  likeBid,
  unlikeBid,
} from "../../../pages/BidsListPage/store/feature/likeBidsSlice.ts";
import { useEffect, useState } from "react";
import $api from "../../../shared/api/http";
import "./Bid.styles.css";

export default function Bid({
  bid,
  userId,
}: {
  bid: BidType;
  userId: string | null;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const likes = useSelector(
    (state: RootState) =>
      state.likes.likes.filter((like) => like.bids_id === bid.id).length
  );
  const hasLiked = useSelector((state: RootState) =>
    state.likes.likes.some(
      (like) => like.bids_id === bid.id && like.user_id === Number(userId)
    )
  );

  const handlerLike = () => {
    if (hasLiked) {
      dispatch(unlikeBid({ bidId: bid.id, userId }));
    } else {
      dispatch(likeBid({ bidId: bid.id, userId }));
    }
  };

  const handleRespond = () => {
    dispatch(
      responseUserBid({
        userId: userId,
        bidId: bid.id,
        authorId: bid.author_id,
        title: bid.title,
      })
    );
  };
  useEffect(() => {
    $api(`${import.meta.env.VITE_REACT_APP_API_URL}/names-customers`, {
      params: { authorId: bid.author_id },
    }).then((res) => setName(res.data));
  }, []);

  return (
    <div
      className={
        "start-bid w-[60rem] rounded-md bg-white p-3 text-left hover:shadow-lg transition duration-300 pl-8 shadow-sm"
      }
    >
      <h3 className={"text-lg font-semibold tracking-wide leading-8"}>
        {bid.title}
      </h3>
      <div className={"flex items-center gap-x-2"}>
        <img className={"w-4"} src={"/svg/Vector.svg"} alt={bid.title} />
        <p
          className={
            "flex-grow text-sm font-sans tracking-wide leading-8 text-gray-500"
          }
        >
          {bid.address}
        </p>
        <button
          className='underline'
          onClick={() =>
            description ? setDescription(false) : setDescription(true)
          }
        >
          Подробнее
        </button>
      </div>
      {description ? (
        <div className='flex border-double border-4 p-2'>
          <p className='italic font-sm text-gray-800 '>{bid.description}</p>
        </div>
      ) : (
        <></>
      )}

      <div className={"flex justify-between items-center gap-x-3 -mt-3"}>
        <p className={"font-serif"}>{name}</p>
        <div className='ml-auto'>
          <button onClick={handlerLike} className={hasLiked ? "has-liked" : ""}>
            {likes}
            <img src='/img/care.png' className='w-8' alt='like-image' />
          </button>
        </div>
        <ButtonResponse handleRespond={handleRespond} />
      </div>
    </div>
  );
}
