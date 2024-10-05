import { NavLink } from "react-router-dom";
import { AuthContext } from "../../main";
import { useContext, useState } from "react";

const Navbar = (): JSX.Element => {
  const { authStore } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [navBarState, setNavBarState] = useState<boolean>(false);

  const activeLink = "text-[#249C30]";
  const normalLink =
    "text-[#515066] hover:text-[#51B85B] transition ease-in-out duration-100";

  return (
    <header className='sticky inset-x-0 top-0 pt-5 pl-2 pr-2 pb-5 px-10 z-10'>
      <div className='bg-white rounded-full shadow-md'>
        {token ? (
          <div className='mx-auto flex items-center justify-between p-1'>
            <div className={"ml-5"}>
              <NavLink className='flex lg:flex-1 -m-1.5 p-1.5' to='/'>
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
                  to='/bids-list'
                >
                  Список заявок
                </NavLink>
              </button>

              <button type='button'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
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
                    className={"w-[25px] mr-5"}
                    alt='logo'
                  />
                </NavLink>
              </button>
            </div>
          </div>
        ) : (
          <div className='mx-auto flex items-center justify-between p-4" aria-label="Global'>
            <div>
              <NavLink className='flex lg:flex-1 -m-1.5 p-1.5' to='/'>
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
};

export default Navbar;
