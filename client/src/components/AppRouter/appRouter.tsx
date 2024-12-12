import { Route, Routes } from "react-router";
import {
  ProfileActiveBidPage,
  ProfileBidsRouter,
  ProfileCompleteBidPage,
  ProfileDashboard,
  ProfileProgressBidPage,
  UserResponsesList,
} from "../../widgets";
import MapComponent from "../Map/Map";
import BidPage from "../Pages/BidPage";
import BidForm from "../BidForm/BidForm";
import { MainPage } from "../../pages/MainPage";
import ChatPage from "../ChatPage/ChatPage";
import { LoginPage } from "../../pages/LoginPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { BidsListPage } from "../../pages/BidsListPage";
import CertificateList from "../Certificate/CertificateList";
import { RegistrationPage } from "../../pages/RegistrationPage";

export function AppRouter() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path={"/bid-form"} element={<BidForm />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/register"} element={<RegistrationPage />} />
      <Route path={"/bids-list-page"} element={<BidsListPage />} />
      <Route path={"/profile/*"} element={<ProfilePage />}>
        <Route path={"bio"} element={<ProfileDashboard />} />
        <Route path={"bid/*"} element={<ProfileBidsRouter />}>
          <Route path={"active"} element={<ProfileActiveBidPage />} />
          <Route path={"progress"} element={<ProfileProgressBidPage />} />
          <Route path={"closed"} element={<ProfileCompleteBidPage />} />
        </Route>
        <Route path={"responses"} element={<UserResponsesList />} />
        <Route path={"certificates"} element={<CertificateList />} />
      </Route>
      <Route path={"/map"} element={<MapComponent />} />
      <Route path={"/chat"} element={<ChatPage />} />
      <Route path={"/bid/:id"} element={<BidPage />} />
    </Routes>
  );
}
