import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../main.tsx";
import { useContext, useState } from "react";
import { activeLink, normalLink } from "./constants/links.ts";

export function Navbar() {
  const { authStore } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [navBarState, setNavBarState] = useState<boolean>(false);

  return (
    <header className='sticky p-5'>
      <div className='bg-white rounded-full shadow-md'>
        {token ? (
          <div className='mx-auto flex items-center justify-between p-1'>
            <div className={"ml-5"}>
              <NavLink className={"flex lg:flex-1 -m-1.5 p-1.5"} to='/'>
                <img className='h-10 w-auto' src='/svg/Logo1.svg' alt='logo' />
              </NavLink>
            </div>
            <div className='items-center'>
              <button type='button'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  to='/'
                >
                  Главная
                </NavLink>
              </button>
              <button type='button'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  to='/bids-list-page'
                >
                  Список заявок
                </NavLink>
              </button>

              <button type='button'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink}
                  to='/profile/bio'
                >
                  Моя страница
                </NavLink>
              </button>

              <button type='button'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  to='/chat'
                >
                  Чат
                </NavLink>
              </button>
            </div>
            <div>
              <button
                type='button'
                onClick={() => setNavBarState(!navBarState)}
              >
                <NavLink
                  to='/'
                  onClick={() => authStore.logout()}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <img
                    src={"/img/log-out_1330264.png"}
                    width={'30rem'}
                    alt='logo'
                  />
                </NavLink>
              </button>
            </div>
          </div>
        ) : (
          <div className='mx-auto flex items-center justify-between p-4" aria-label="Global'>
            <div>
              <NavLink className={"flex lg:flex-1 -m-1.5 p-1.5"} to='/'>
                <img className='h-10 w-auto' src='/svg/Logo1.svg' alt='logo' />
              </NavLink>
            </div>

            <div className='items-center'>
              <button type='button'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  to='/'
                >
                  Главная
                </NavLink>
              </button>
            </div>

            <div>
              <button
                type='button'
                onClick={() => setNavBarState(!navBarState)}
              >
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  to='/login'
                >
                  Войти
                </NavLink>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
