import {useEffect, useState} from "react";
import io from "socket.io-client";

export interface MessageType {
  id: number,
  room_id: number,
  user_id: number,
  text_message: string,
  is_read: boolean,
  createdAt: Date,
  updatedAt: Date
}

export type MessagesType = [MessageType] | any

export type roomId = any

function Messages({roomId}: roomId): JSX.Element {
  const [messages, setMessages] = useState<MessagesType>([])
  const [newMessage, setNewMessage] = useState('')

  const userId: string | null = localStorage.getItem('userId')

  const socket = io(`${import.meta.env.VITE_REACT_APP_SOCKET_URL}`);

  const inputHandler = (event: any) =>
    setNewMessage(event.target.value)

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  const request = {
    room_id: roomId,
    text_message: newMessage,
    user_id: userId,
    is_read: false
  }
    if (!newMessage) return;

    socket.emit('sendMessage', {request});
    setNewMessage('')
  }

  useEffect(() => {
    const searchParams = {
      room: roomId,
      user: userId
    }
    socket.emit('join', searchParams)
  }, [])

  useEffect(() => {
    socket.on('messages', ({data}) => {
      setMessages(data)
    })
  }, [messages])

  socket.on('message', (response) => {
    setMessages((messages: MessagesType) => [...messages, response.data.messageCreate])
  })

  return(
    <div>
      <div className='flex flex-col h-[80vh] w-[56vw] bg-white rounded-lg p-2.5 bg-'>
        <div
          className='h-[79vh] bg-[url("/public/svg/logo2.svg")] bg-center bg-no-repeat bg-[length:900px_600px]'
        >
          <div className='h-[78vh] overflow-auto'>
          {
            messages && messages.length ?
              messages.map((message: MessageType) => {
                return (
                  <>
                    {
                      message.user_id === Number(userId) ?
                        <div
                          key={message.id}
                          className='flex justify-end m-2.5'
                        >
                          <div
                            className='bg-gray-300 rounded-lg p-1.5 max-w-[30vw] break-words'
                          >
                            {message.text_message}
                          </div>
                        </div>
                        :
                        <div
                          key={message.id}
                          className='flex justify-start m-2.5'
                        >
                          <div
                            className='bg-lime-600 rounded-lg p-1.5 max-w-[30vw] break-words'
                          >
                            {message.text_message}
                          </div>
                        </div>
                    }
                  </>
                )
              })
              :
              <div>Нет сообщений</div>
          }
        </div>
        </div>
      </div>
      <div className='flex w-[50vw]]'>
        <input
          className='rounded-lg grow mt-2.5 mb-2.5 h-10 pl-1.5'
          type='text'
          name='inputMessage'
          placeholder='Написать сообщение'
          value={newMessage}
          onChange={inputHandler}
          required
        />
        <button
          className='rounded-md bg-lime-600 text-white p-1.5 text-left hover:scale-105 transition duration-300 cursor-pointer mt-2.5 mb-2.5 ml-2.5'
          onClick={buttonHandler}
        >
          Отправить
        </button>
      </div>
    </div>
  )
}

export default Messages;