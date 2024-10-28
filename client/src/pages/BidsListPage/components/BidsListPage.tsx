import { Link } from "react-router-dom";
import Header from "../../../ui/headers/Header";
import { useAppDispatch } from "../../../../hooks/redux";
import { filterBids } from "../store/feature/bidsSlice";
import SearchInput from "../../../ui/SearchInput/SearchInput";
import Button from "../../../ui/buttons/ButtonsWithIcons/Button";
import { useState } from "react";
import MapComponent from "../../../components/Map/Map";
import BidList from "../../../modules/BidList/index";

export default function BidsListPage() {
  const [showMap, setShowMap] = useState(false);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBids(e.target.value));
  };
  return (
    <div className='flex flex-col gap-y-5'>
      <Header label={"Список доступных заявок"} />
      <div className='flex justify-around items-center flex-row gap-x-5 mb-5'>
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
