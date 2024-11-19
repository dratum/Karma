import { useState } from "react";
import EditProfileDataForm from "../editProfileDataForm/EditProfileDataForm";
import { UserDataType } from "../../types";
import { useAppDispatch } from "../../../../../hooks/redux";
import { updateUser } from "../../../../../features/userEditProfileSlice";
import Button from "../../../../shared/ui/buttons/Button";
import UserProfileData from "../../../../shared/ui/userProfileData/UserProfileData";

export default function UserDataWidget({ user }: { user: UserDataType }) {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const handleUserUpdate = (updatedUser: UserDataType): void => {
    dispatch(updateUser(updatedUser));
    setIsEditing((prev) => !prev);
  };

  return (
    <div
      className={
        "rounded-md shadow-lg p-4 flex flex-col items-center bg-white bg-opacity-55 "
      }
    >
      <img
        className={"h-44 rounded-full"}
        src='/img/profilePhoto.png'
        alt='user picture'
        loading='lazy'
      />
      <>
        <div className={"flex flex-col items-center gap-y-3"}>
          {isEditing ? (
            <>
              <EditProfileDataForm
                user={user}
                onUserUpdate={handleUserUpdate}
              />
              <Button
                label={"Отменить"}
                onClick={() => setIsEditing((prev) => !prev)}
              />
            </>
          ) : (
            <>
              <UserProfileData user={user} />
              <Button
                label={"Редактировать данные профиля"}
                onClick={() => setIsEditing((prev) => !prev)}
              />
            </>
          )}
        </div>
      </>
    </div>
  );
}
