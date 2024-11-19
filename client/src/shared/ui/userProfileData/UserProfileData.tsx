import { UserDataType } from "../../components/ProfilePageWidgets/types";

export default function UserProfileData({ user }: { user: UserDataType }) {
  return (
    <>
      <span className={"font-medium text-md  m-3"}>{user.fio}</span>
      <span className={"font-medium text-md  m-3"}>{user.email}</span>
      <span className={"font-medium text-md  m-3"}>{user.phone}</span>
    </>
  );
}
