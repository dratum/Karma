import { Outlet } from "react-router";
import NavBar from '../../../shared/ui/NavBarProfile/index';

export function ProfilePage() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
