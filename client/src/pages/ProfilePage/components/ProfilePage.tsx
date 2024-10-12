import { Outlet } from "react-router";
import NavBar from "../../../components/NavBarProfile/components/NavBar";

export default function ProfilePage() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
