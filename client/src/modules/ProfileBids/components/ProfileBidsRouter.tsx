import { NavLink } from "react-router-dom";

export default function ProfileBidRouter() {
  const activeLink = "text-lime-600 rounded-lg border-lime-600 border-2";
  const normalLink =
    "text-gray-600 hover:text-[#51B85B] transition ease-in-out duration-100";

  return (
    <div className='flex flex-row mx-10 mt-8'>
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
  );
}
