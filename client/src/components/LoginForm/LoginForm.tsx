import { useContext, useState } from "react";
import { AuthContext } from "../../main.tsx";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authStore } = useContext(AuthContext);

  return (
    <>
      <h1 className='text-center'>Вход</h1>
      <form
        className={
          "drop-shadow-md flex flex-col bg-white p-6 w-96 rounded-xl gap-2 mt-12 mx-[auto] "
        }
        onSubmit={(e) => {
          e.preventDefault();
          authStore.login(email, password);
        }}
      >
        <label
          className='text-sm font-medium tracking-wide leading-8 text-gray-900'
          htmlFor={"title"}
        >
          Введите Ваш email:
        </label>
        <input
          id={"title"}
          placeholder={"email"}
          type={"text"}
          className={
            "p-2 rounded-xl shadow-sm outline-gray-100 border border-gray-200"
          }
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label
          htmlFor={"address"}
          className={
            "text-sm font-medium tracking-wide leading-8 text-gray-900 mt-2"
          }
        >
          Введите пароль:
        </label>
        <input
          id={"address"}
          placeholder={"Пароль"}
          type={"password"}
          className={
            "outline-gray-100 border-gray-200 p-2 rounded-xl shadow-sm outline-none"
          }
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className={
            "transition duration-300 mt-3 rounded-md" +
            " shadow-sm border-lime-600 hover:bg-lime-600 hover:text-white" +
            " hover:border-lime-600 bg-white text-lime-600"
          }
        >
          Войти
        </button>
        <Link to='/register'>
          <button
            type='button'
            className={
              "transition duration-300 mt-3 rounded-md" +
              " shadow-sm border-lime-600 hover:bg-lime-600 hover:text-white" +
              " hover:border-lime-600 bg-white text-lime-600"
            }
          >
            Создать акаунт
          </button>
        </Link>
      </form>
    </>
  );
}

export default LoginForm;
