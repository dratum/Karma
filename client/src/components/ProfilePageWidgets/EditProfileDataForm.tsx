import { UserDataType } from "./types";
import { useAppDispatch } from "../../../hooks/redux";
import {
  saveUserData,
  updateUser,
} from "../../../features/userEditProfileSlice";
import { userId } from "../../constants/const";
import Button from "../../ui/buttons/Button";
import { useState } from "react";

interface EditProfileDataFormProps {
  user: UserDataType;
  onUserUpdate: (updatedUser: UserDataType) => void;
}

export default function EditProfileDataForm({
  user,
  onUserUpdate,
}: EditProfileDataFormProps) {
  const dispatch = useAppDispatch();
  const [fio, setFio] = useState(user.fio);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { fio, email, phone };
    onUserUpdate(updatedUser);
    dispatch(updateUser(updatedUser));
    dispatch(saveUserData({ ...updatedUser, userId }));
  };

  return (
    <form onSubmit={handleUpdateUser} className='flex flex-col items-center'>
      <label htmlFor='fio' className='text-md font-bold text-green-700'>
        Ваше Имя:
      </label>
      <input
        id='fio'
        className={
          "font-semibold text-md col-start-1 col-end-3 flex-1 flex flex-row m-1 w-80 bg-green-200 border-2 border-green-500 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-green-700 hover:bg-green-100 hover:border-green-700 transition duration-300"
        }
        type='text'
        value={fio || ""}
        onChange={(e) => setFio(e.target.value)}
      />

      <label htmlFor='email' className='text-md font-semibold text-green-700'>
        E-mail:
      </label>
      <input
        id='email'
        className={
          "font-semibold text-md col-start-1 col-end-3 flex-1 flex flex-row m-1 w-80 bg-green-200 border-2 border-green-500 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-green-700 hover:bg-green-100 hover:border-green-700 transition duration-300"
        }
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor='phone' className={"text-md font-semibold text-green-700"}>
        Номер телефона:
      </label>
      <input
        id='phone'
        className={
          "font-semibold text-md col-start-1 col-end-3 flex-1 flex flex-row m-2 w-80 bg-green-200 border-2 border-green-500 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-green-700 hover:bg-green-100 hover:border-green-700 transition duration-300"
        }
        type='text'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className='flex flex-col gap-y-2 mt-5'>
        <Button label={"Сохранить"} />
      </div>
    </form>
  );
}
