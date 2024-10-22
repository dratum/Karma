import { useContext, useState } from "react";
import { AuthContext } from "../../main";

function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const { authStore } = useContext(AuthContext);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          authStore.registration(name, dateOfBirth, email, password, phone);
        }}
        className={
          "drop-shadow-md flex flex-col bg-white p-6 w-96 rounded-xl gap-2 mt-12 mx-[auto] "
        }
      >
        <label
          className='text-sm font-medium tracking-wide leading-8 text-gray-900'
          htmlFor={"title"}
        >
          Ваше полное имя:
        </label>
        <input
          id={"title"}
          placeholder={"ФИО"}
          type={"text"}
          className={
            "p-2 rounded-xl shadow-sm outline-gray-100 border border-gray-200"
          }
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label
          className='text-sm font-medium tracking-wide leading-8 text-gray-900'
          htmlFor={"title"}
        >
          Ваша дата рождения:
        </label>
        <input
          id={"title"}
          type={"date"}
          className={
            "p-2 rounded-xl shadow-sm outline-gray-100 border border-gray-200"
          }
          onChange={(e) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
        />

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
          placeholder={"Пароль"}
          type={"password"}
          className={
            "outline-gray-100 border-gray-200 p-2 rounded-xl shadow-sm outline-none"
          }
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <label
          htmlFor={"address"}
          className={
            "text-sm font-medium tracking-wide leading-8 text-gray-900 mt-2"
          }
        >
          Ваш телефон:
        </label>
        <input
          placeholder={"Телефон"}
          type={"tel"}
          className={
            "outline-gray-100 border-gray-200 p-2 rounded-xl shadow-sm outline-none"
          }
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />

        <button
          className={
            "transition duration-300 mt-3 rounded-md" +
            " shadow-sm border-lime-600 hover:bg-lime-600 hover:text-white" +
            " hover:border-lime-600 bg-white text-lime-600"
          }
        >
          Создать акаунт
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
