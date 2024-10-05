import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import React, { useEffect, useState } from "react";
import { filterBids, getBids } from "../../../features/bidsSlice.ts";
import Bid from "../Bid/Bid/Bid.tsx";
import { getLikes } from "../../../features/likeBidsSlice.ts";
import MapComponent from "../Map/Map.tsx";
import SearchInput from "../UI/SearchInput/SearchInput.tsx";
import iconAddPost from "./add-post .png";

export default function BidList() {
  const dispatch = useAppDispatch();
  const [showMap, setShowMap] = useState(false);
  const bids = useAppSelector((state) => state.bids.filteredBids);
  const userId: string | null = localStorage.getItem("userId"); // TODO: можно попробовать вынести в отдельный файл.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBids(e.target.value));
  };

  useEffect(() => {
    dispatch(getBids());
    dispatch(getLikes());
  }, [dispatch]);

  return (
    <>
      <div className={"flex items-center justify-center mb-8"}>
        <h1 className='text-4xl tracking-normal font-medium leading-relaxed'>
          Список доступных заявок
        </h1>
      </div>

      <div className={"flex items-end justify-around flex-row gap-x-5 mb-5"}>
        <SearchInput onChange={handleChange} />
        <button
          className={
            "flex flex-row gap-x-3 items-center shadow-md focus:outline-none transition duration-300 rounded-xl" +
            " shadow-sm hover:bg-lime-600 hover:text-white" +
            " hover:border-lime-600 bg-white text-lime-600"
          }
          onClick={() => (showMap ? setShowMap(false) : setShowMap(true))}
        >
          <img src='/svg/map.svg' className='w-7' alt='map-button' />
          Показать на карте
        </button>
        <Link to={"/bid-form"}>
          <button
            className={
              "shadow-md focus:outline-none transition duration-300 rounded-xl" +
              " shadow-sm hover:bg-lime-600 hover:text-white" +
              " hover:border-lime-600 bg-white text-lime-600 flex flex-row items-center gap-x-3"
            }
          >
            <img src={iconAddPost} className='w-6' alt='add-button' /> Cоздать
            заявку
          </button>
        </Link>
      </div>

      <div className='flex flex-row justify-around gap-x-72 '>
        <div className={"flex flex-col gap-y-5"}>
          {bids && bids.length ? (
            bids.map((bid) => <Bid key={bid.id} bid={bid} userId={userId} />)
          ) : (
            <div
              className={"flex gap-x-5 justify-center items-center mt-[100px]"}
            >
              <img className='w-10' src='svg/question.png' />
              <h1 className={"text-xl"}>
                Ничего не найдено по Вашему запросу!
              </h1>
            </div>
          )}
        </div>
        {showMap && (
          <div className={"flex justify-end"}>
            <div className='fixed right-502 rounded-full shadow-md'>
              <MapComponent />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
