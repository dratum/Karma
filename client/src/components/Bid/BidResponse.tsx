import { useAppDispatch } from "../../../hooks/redux.ts";
import { cancelResponse } from "../../../features/userResponseSlice.ts";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import $api from "../../shared/api/http";
import { BidType } from "../../pages/BidsListPage/store/feature/bidsSlice.ts";
import Button from "../../shared/ui/buttons/ButtonsWithIcons/Button.tsx";

export default function BidResponse({
  response,
  userId,
}: {
  response: BidType;
  userId: string | null;
}) {
  const [name, setName] = useState("");
  const [idResponse, setIdResponse] = useState(0);

  const dispatch = useAppDispatch();
  const handlerClick = () => {
    dispatch(cancelResponse({ bidId: response.id, userId }));
  };

  useEffect(() => {
    $api(`${import.meta.env.VITE_REACT_APP_API_URL}/id-for-chatroom`, {
      params: { id: response.id },
    }).then((res) => setIdResponse(res.data));

    $api(`${import.meta.env.VITE_REACT_APP_API_URL}/names-customers`, {
      params: { authorId: response.author_id },
    }).then((res) => setName(res.data));
  }, []);

  return (
    <>
      <div
        className={
          "start-bid rounded-md bg-white text-left hover:shadow-xl pl-8 shadow-md flex flex-col p-5 gap-y-2"
        }
      >
        <h3 className={"text-lg font-semibold tracking-wide leading-8"}>
          {response.title}
        </h3>
        <div className={"flex gap-x-2"}>
          <img className={"w-4"} src={"/svg/Vector.svg"} alt='logo' />
          <p
            className={
              "text-sm font-sans tracking-wide leading-8 text-gray-500"
            }
          >
            {response.address}
          </p>
        </div>
        <div className={"flex justify-between items-center h-10"}>
          <p className={"font-serif"}>{name}</p>

          <div className={"flex items-end gap-x-5"}>
            <NavLink to={`/chat/?chat=${idResponse}&choise=${true}`}>
              <img
                className={"w-10 hover:shadow-md rounded-3xl"}
                src={"/svg/MailOutlined.svg"}
                alt='logo'
              />
            </NavLink>
            <Button
              label='Отказать в помощи'
              srcPath='/img/cancel.png'
              onClick={handlerClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}
