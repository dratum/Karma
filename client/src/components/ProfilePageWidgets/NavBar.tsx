import { NavLink } from "react-router-dom";
import Header from "../../ui/headers/Header";

export default function NavBar() {
  const activeLink = "text-lime-600";
  const normalLink =
    "text-gray-600 hover:text-[#51B85B] transition ease-in-out duration-100";

  return (
    <>
      <Header label={"Личный кабинет"} />
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
    </>
  );
}
