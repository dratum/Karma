export default function SuccessModal({...props}){
  return (
    <div className="fixed top-0 left-0 w-full h-full flex
         items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md flex items-center justify-center flex-col">
        <p className="mb-4 text-lg">Заявка на помощь успешно отправлена!</p>
        <button {...props}
                className="px-4 py-2 rounded-md border-lime-600 hover:bg-lime-600
                hover:text-white bg-white text-lime-600">
          Закрыть
        </button>
      </div>
    </div>
  )
}