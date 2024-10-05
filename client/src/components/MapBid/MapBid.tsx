import { BidType } from "../../../features/bidsSlice.ts";
import { responseUserBid } from "../../../features/userResponseSlice.ts";
import { useAppDispatch } from "../../../hooks/redux.ts";
import ButtonResponse from "../ButtonResponse/ButtonResponse.tsx";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store/store.ts';
import { likeBid, unlikeBid } from "../../../features/likeBidsSlice.ts";
import { useNavigate } from "react-router";


export default function Bid({bid, userId, name}: { bid: BidType, userId: string | null, name: string }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const likes = useSelector((state: RootState) =>
    state.likes.likes.filter(like => like.bids_id === bid.id).length
  )
  const hasLiked = useSelector((state: RootState) =>
    state.likes.likes.some(like => like.bids_id === bid.id && like.user_id === Number(userId)
    ));

  const handlerLike = () => {
    if (hasLiked) {
      dispatch(unlikeBid({bidId: bid.id, userId}));
    } else {
      dispatch(likeBid({bidId: bid.id, userId}))
    }
  }

  const handleRespond = () => {
    dispatch(responseUserBid({userId: userId, bidId: bid.id, authorId: bid.author_id, title: bid.title}));
    navigate('/profile/responses')
  };

  return (
    <>
      <div
        className={'rounded-md bg-white p-3 text-left hover:scale-[1.02] transition duration-300 pl-8 w-[1350px] mx-[auto] shadow-md'}>
        <h3 className={'text-lg font-semibold tracking-wide leading-8'}>{bid.title}</h3>
        <div>{bid.description}</div>
        <div className={'flex gap-x-2'}>
          <img className={'w-4'} src={'/svg/Vector.svg'} alt={bid.title}/>
          <p className={'text-sm font-sans tracking-wide leading-8 text-gray-500'}>{bid.address}</p>
        </div>
        <div className={'flex justify-between items-baseline gap-x-3 -mt-2'}>
          <p className={'font-serif'}>{name}</p>
          <button className={'mr-auto'} onClick={handlerLike}>🙏 {likes}</button>
          <ButtonResponse handleRespond={handleRespond}/>
        </div>
      </div>
    </>
  )
}