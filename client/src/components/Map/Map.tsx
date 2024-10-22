/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { v4 as uuidv4 } from "uuid";
import $api from "../../http";
import { BidType } from "../../../features/bidsSlice";
import { useNavigate } from "react-router-dom";
import "./Map.css";

const center = [55.76, 37.64];

function MapComponent(): JSX.Element {
  const [bidsWithCoords, setBidsWithCoords] = useState<Array<BidType>>([
    {} as BidType,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await $api(
        `${import.meta.env.VITE_REACT_APP_API_URL}/all-bids`
      );
      const bidObjects = response.data;

      const promises = bidObjects.map(async (bidObj: BidType) => {
        const response = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=53ab01a5-fcd6-4af6-8795-4f7d5fdf4504&geocode=${encodeURIComponent(
            bidObj.address
          )}`
        );
        const data = await response.json();
        const foundCoordinates =
          data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .map(parseFloat)
            .reverse();
        bidObj["coords"] = foundCoordinates;

        return bidObj;
      });
      Promise.all(promises).then((res) => setBidsWithCoords(res));
    }

    fetchData();
  }, []);

  return (
    <div className='map-wrapper'>
      <h1 className='find-karma font-normal'>Найди свою Карму🔎🤝</h1>
      <div className='map'>
        <YMaps query={{ load: "package.full" }}>
          <Map
            state={{
              center,
              zoom: 9,
              controls: [],
            }}
            width='inherit'
            height='inherit'
          >
            {bidsWithCoords.map((n) => (
              <Placemark
                key={uuidv4()}
                geometry={n.coords}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [50, 50],
                  iconImageHref: "https://img.icons8.com/ios-filled/2x/marker",
                }}
                onClick={() => navigate(`/bid/${n.id}`)}
              />
            ))}
          </Map>
        </YMaps>
      </div>
    </div>
  );
}

export default MapComponent;
