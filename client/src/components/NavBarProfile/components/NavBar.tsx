import { NavLink, useLocation } from "react-router-dom";
import Header from "../../../ui/headers/Header";
import { activeLink, normalLink } from "../constants/links";

export default function NavBar() {
  const location = useLocation();

  const isActive = location.pathname.startsWith("/profile/bid");

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
            className={isActive ? activeLink : normalLink}
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
            to={"/profile/certificates"}
          >
            <button>Потратить очки</button>
          </NavLink>
        </div>
      </div>
    </>
  );
}
