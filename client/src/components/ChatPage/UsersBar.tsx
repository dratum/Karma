import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {useEffect, useState} from "react";
import {getRooms, RoomType} from "../../../features/roomSlice.ts";
import Messages from "./Messages.tsx";


function UsersBar(): JSX.Element {
  const [choise, setChoise] = useState({choise: Boolean(new URLSearchParams(location.search).get("choise")), roomId: Number(new URLSearchParams(location.search).get("chat"))})
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(state => state.rooms.list);
  const activChat = 'rounded-md bg-lime-600 text-white p-3 text-left hover:scale-105 transition duration-300 cursor-pointer m-2.5'
  const normalChat = 'rounded-md bg-white p-3 text-left hover:scale-105 transition duration-300 cursor-pointer m-2.5'

  useEffect(() => {
    dispatch(getRooms())
  }, [dispatch])

    return(
      <div
        className='flex flex-row min-w-32'
      >
        <div className='flex flex-col h-[80vh] overflow-auto'>
          {
            rooms && rooms.length ?
              rooms.map((room: RoomType) => {
                return (
                  <>
                    <div
                      key={room.id}
                      className={choise.choise && choise.roomId === room.room_id ? activChat : normalChat}
                    >
                      <div
                        onClick={() => {
                          setChoise({choise: !choise.choise, roomId: room.room_id})}}
                      >
                        {room.title}
                      </div>
                    </div>
                  </>
                )
              })
              :
              <div>Нет чатов</div>
          }
        </div>
        <div>
          {
            choise.choise ?
              <Messages roomId={choise.roomId}/>
              :
              <div>
                <div className='flex flex-col h-[80vh] w-[56vw] overflow-auto bg-white rounded-lg p-2.5'>
                  <div
                    className='h-[79vh] bg-[url("/public/svg/logo2.svg")] bg-center bg-no-repeat bg-[length:900px_600px] bg-opacity-50'
                  >
                    Выберите чат
                  </div>
                </div>
                <div className='flex w-[50vw]]'>
                  <input
                    className='rounded-lg grow mt-2.5 mb-2.5 h-10 pl-1.5'
                    type='text'
                    name='inputMessage'
                    placeholder='Написать сообщение'
                    required
                  />
                  <button
                    className='rounded-md bg-lime-600 text-white p-1.5 text-left hover:scale-105 transition duration-300 cursor-pointer mt-2.5 mb-2.5 ml-2.5'
                  >
                    Отправить
                  </button>
                </div>  
              </div>
          }
        </div>
      </div>
    )
}

export default UsersBar;