import "./App.css";

import BidForm from "../components/BidForm/BidForm.tsx";
import { MainPage } from "../pages/MainPage/index.ts";
import { BidsListPage } from "../pages/BidsListPage/index.ts";
import ProfileBidPage from "../components/ProfilePageWidgets/ProfileBidPage.tsx";
import { ProfilePage } from "../pages/ProfilePage/index.ts";
import ProfileActiveBidPage from "../components/ProfilePageWidgets/ProfileActiveBidPage.tsx";
import ProfileProgressBidPage from "../components/ProfilePageWidgets/ProfileProgressBidPage.tsx";
import ProfileCompleteBidPage from "../components/ProfilePageWidgets/ProfileCompleteBidPage.tsx";
import MapComponent from "../components/Map/Map.tsx";
import { Navbar } from "../components/NavbarMain/index.ts";
import ChatPage from "../components/ChatPage/ChatPage.tsx";
import ResponsesPage from "../components/Pages/ResponsesPage/ResponsesPage.tsx";
import BidPage from "../components/Pages/BidPage.tsx";
import CertificateList from "../components/Certificate/CertificateList.tsx";
import LoginPage from "../pages/LoginPage/index.ts";
import RegistrationPage from "../pages/RegistrationPage/components/RegisterPage.tsx";
import { Route, Routes } from "react-router";
import { ProfileDashboard } from "../modules/ProfileDashboard/index.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path={"/bid-form"} element={<BidForm />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegistrationPage />} />
        <Route path={"/bids-list-page"} element={<BidsListPage />} />
        <Route path={"/profile/*"} element={<ProfilePage />}>
          <Route path={"bio"} element={<ProfileDashboard />} />
          <Route path={"bid/*"} element={<ProfileBidPage />}>
            <Route path={"active"} element={<ProfileActiveBidPage />} />
            <Route path={"progress"} element={<ProfileProgressBidPage />} />
            <Route path={"closed"} element={<ProfileCompleteBidPage />} />
          </Route>
          <Route path={"responses"} element={<ResponsesPage />} />
          <Route path={"certificates"} element={<CertificateList />} />
        </Route>

        <Route path={"/map"} element={<MapComponent />} />
        <Route path={"/chat"} element={<ChatPage />} />
        <Route path={"/bid/:id"} element={<BidPage />} />
      </Routes>
    </>
  );
}

export default App;
