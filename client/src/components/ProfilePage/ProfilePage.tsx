import { NavLink } from "react-router-dom";

function ProfilePage(): JSX.Element {
  const activeLink = "text-lime-600";
  const normalLink =
    "text-gray-600 hover:text-[#51B85B] transition ease-in-out duration-100";

  return (
    <div className=''>
      <div className={"flex items-center justify-center mb-8"}>
        <h2 className='profile-page-title text-4xl tracking-wide font-normal leading-relaxed'>
          Личный кабинет
        </h2>
      </div>
      <div className='flex justify-center'>
        <div className='flex flex-row justify-around gap-x-10 bg-white bg-opacity-55 shadow-md rounded-xl w-[1100px]'>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            to={"/profile/bio"}
          >
            <button>Мои данные</button>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            to={"/profile/bid/active"}
          >
            <button>Мои заявки</button>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            to={"/profile/responses"}
          >
            <button>Мои отклики</button>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            to={"/certificates"}
          >
            <button>Потратить очки</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
