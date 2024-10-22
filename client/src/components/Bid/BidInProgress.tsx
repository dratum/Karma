import { useEffect, useState } from "react";
import { Bid, completeUserBids } from "../../../features/bidsUserSlice.ts";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { NavLink } from "react-router-dom";
import $api from "../../http/index.ts";

// export type bidId = object

export default function BidProgress({ bid }: { bid: Bid }) {
  const [nameExec, setNameExec] = useState("");
  const [description, setDescription] = useState(false);

  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");
  const completeHandler = () => {
    dispatch(completeUserBids({ bidId: bid.id, userId }));
  };

  useEffect(() => {
    $api(`${import.meta.env.VITE_REACT_APP_API_URL}/names-exec`, {
      params: { bidId: bid.id },
    }).then((res) => setNameExec(res.data));
  }, []);

  return (
    <>
      <div
        className={
          "start-bid rounded-md bg-white text-left hover:scale-[1.02] transition duration-300 pl-8 shadow-md p-5"
        }
      >
        <h3 className={"text-lg font-semibold tracking-wide leading-8"}>
          {bid.title}
        </h3>
        <div className={"flex justify-between items-center gap-x-2"}>
          <img className={"w-4"} src={"/svg/Vector.svg"} alt={bid.title} />
          <p
            className={
              "-ml-[950px] text-sm font-sans tracking-wide leading-8 text-gray-500"
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
          <div className='flex border-double border-4 p-2 w-[500px]'>
            <p className='italic font-sm text-gray-800 '>{bid.description}</p>
          </div>
        ) : (
          <></>
        )}
        <div className={"flex justify-between items-center gap-x-3 -mt-3"}>
          <p className={"font-serif"}>{nameExec}</p>
          <div>
            <div className={"flex justify-between items-end gap-x-5 mt-2"}>
              <NavLink to={`/chat/?chat=${bid.id}&choise=${true}`}>
                <img
                  className={"w-10"}
                  src={"/svg/MailOutlined.svg"}
                  alt='logo'
                />
              </NavLink>
              <button
                className={
                  "focus:outline-none size-26 text-sm transition duration-300 mt-3 rounded-md" +
                  " shadow-md border-lime-600 hover:bg-lime-600 hover:text-white" +
                  " bg-white text-lime-600 flex gap-x-2 items-center"
                }
                onClick={completeHandler}
              >
                <img
                  src='/img/thumbs-up.png'
                  className='w-6'
                  alt='logo-done-bid'
                />
                Помощь оказана
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
