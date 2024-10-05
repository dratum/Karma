import UsersBar from "./UsersBar";


function ChatPage(): JSX.Element {
  return(
    <div
    className='flex justify-center w-[100vw]'>
      <div
        className='flex flex-col h-[85vh]'
      >
        <h2
          className='pl-2.5 text-xl'
        >Список чатов</h2>
        <UsersBar/>
      </div>
    </div>
  )
}

export default ChatPage;