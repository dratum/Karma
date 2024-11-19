import { NavLink, Outlet } from "react-router-dom";

export default function ProfileBidsRouter() {
  const activeLink = "text-lime-600 rounded-lg border-lime-600 border-2";
  const normalLink =
    "text-gray-600 hover:text-[#51B85B] transition ease-in-out duration-100";

  return (
    <div className='flex flex-wrap flex-row justify-center gap-x-5 mt-5'>
      <div className='flex flex-col ml-5'>
        <NavLink
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          to={"/profile/bid/active"}
        >
          <button>Активные заявки</button>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          to={"/profile/bid/progress"}
        >
          <button>Заявки в работе</button>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          to={"/profile/bid/closed"}
        >
          <button>Закрытые заявки</button>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
