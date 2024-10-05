import { useAppDispatch } from "../../../hooks/redux.ts";
import { Bid, deleteUserBid } from "../../../features/bidsUserSlice.ts";
import EditBidModal from "../UI/Modal/EditBidModal/EditBidModal.tsx";
import { useState } from "react";

export default function ActiveBid({ bid }: { bid: Bid }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId"); // TODO: можно попробовать вынести в отдельный файл.

  const deleteHandler = () => {
    dispatch(deleteUserBid({ bidId: bid.id, userId }));
  };

  return (
    <>
      <div
        className={
          "start-bid rounded-md bg-white p-3 text-left hover:scale-[1.02] transition duration-300 pl-8 shadow-md"
        }
      >
        <h3 className={"text-lg font-semibold tracking-wide leading-8"}>
          {bid.title}
        </h3>
        <div className={"flex gap-x-2"}>
          <img className={"w-4"} src={"/svg/Vector.svg"} alt={bid.title} />
          <p
            className={
              "text-sm font-sans tracking-wide leading-8 text-gray-500"
            }
          >
            {bid.address}
          </p>
        </div>
        <div className={"flex justify-between items-baseline"}>
          <button
            className={
              "focus:outline-none size-26 text-sm transition duration-300 mt-3 rounded-md" +
              " shadow-md border-lime-600 hover:bg-lime-600 hover:text-white" +
              " bg-white text-lime-600 flex gap-x-2"
            }
            onClick={() => setEditModalOpen(true)}
          >
            <img src='/svg/edit.png' className='w-5' alt=' ' />
            Редактировать
          </button>
          <button
            className={
              "focus:outline-none size-26 text-sm transition duration-300 mt-3 rounded-md" +
              " shadow-md border-lime-600 hover:bg-lime-600 hover:text-white" +
              " bg-white text-lime-600 flex gap-x-2"
            }
            onClick={deleteHandler}
          >
            <img src='/img/delete.png' className='w-5' alt='' />
            Удалить
          </button>
        </div>
      </div>

      <EditBidModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        bid={bid}
      />
    </>
  );
}
