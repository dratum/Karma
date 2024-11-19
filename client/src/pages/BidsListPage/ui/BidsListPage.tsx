import { Link } from "react-router-dom";
import Header from "../../../shared/ui/headers/Header";
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { filterBids } from "../store/feature/bidsSlice.ts";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Button from "../../../shared/ui/buttons/ButtonsWithIcons/Button";
import React, { useState } from "react";
import MapComponent from "../../../components/Map/Map.tsx";
import {BidList} from "./BidList";

export function BidsListPage() {
  const [showMap, setShowMap] = useState(false);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBids(e.target.value));
  };
  return (
    <div className='flex flex-col items-center gap-y-5'>
      <Header label={"Список доступных заявок"} />
      <div className='flex justify-center items-end gap-x-5 mb-5 w-full'>
        <SearchInput onChange={handleChange} />
        <Button
          label={"Показать на карте"}
          onClick={() => setShowMap((prev) => !prev)}
          srcPath={"/svg/map.svg"}
        />
        <Link to={"/bid-form"}>
          <Button srcPath={"/img/add-post.png"} label={"Создать заявку"} />
        </Link>
      </div>
      <div className='flex justify-center gap-x-2 px-4'>
        <BidList dispatch={dispatch} />
        {showMap && (
          <div className='rounded-full shadow-md'>
            <MapComponent />
          </div>
        )}
      </div>
    </div>
  );
}
