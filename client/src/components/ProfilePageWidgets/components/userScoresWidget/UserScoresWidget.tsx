import { BioProfileType } from "../../types";

export default function UserScoresWidget({ user }: { user: BioProfileType }) {
  return (
    <div className={"flex flex-col items-center"}>
      <div className='w-72 h-72 rounded-full shadow-lg border-green-500 text-center bg-white bg-opacity-55'>
        <div className=' flex flex-col items-center '>
          <img
            className={"drop-shadow-md w-44 scale-y-50 scale-x-50"}
            src='https://cdn-icons-png.flaticon.com/256/4297/4297918.png'
            alt='pic'
            loading='lazy'
          />
          <div className='text-yellow-600 font-semibold text-xl rounded-lg '>
            {user.scores === null ? 0 : user.scores}
          </div>
          <div className='text-md font-semibold text-gray-700 whitespace-normal break-words'>
            очки Вашей кармы
          </div>
        </div>
      </div>
    </div>
  );
}
