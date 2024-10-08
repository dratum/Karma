import "./App.css";

import BidForm from "../components/BidForm/BidForm.tsx";
import { MainPage } from "../pages/MainPage/index.ts";
import { BidsListPage } from "../pages/BidsListPage/index.ts";
import ProfileBidPage from "../components/ProfilePage/ProfileBidPage.tsx";
import ProfilePage from "../components/ProfilePage/ProfilePage.tsx";
import ProfileBioPage from "../components/ProfilePage/ProfileBioPage.tsx";
import ProfileActiveBidPage from "../components/ProfilePage/ProfileActiveBidPage.tsx";
import ProfileProgressBidPage from "../components/ProfilePage/ProfileProgressBidPage.tsx";
import ProfileCompleteBidPage from "../components/ProfilePage/ProfileCompleteBidPage.tsx";
import MapComponent from "../components/Map/Map.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import ChatPage from "../components/ChatPage/ChatPage.tsx";
import ResponsesPage from "../components/Pages/ResponsesPage/ResponsesPage.tsx";
import BidPage from "../components/Pages/BidPage.tsx";
import CertificateList from "../components/Certificate/CertificateList.tsx";
import LoginPage from "../pages/LoginPage/index.ts";
import RegistrationPage from "../pages/RegistrationPage/components/RegisterPage.tsx";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegistrationPage />} />
        <Route path={"/bids-list-page"} element={<BidsListPage />} />
        <Route path={"/bid-form"} element={<BidForm />} />
        <Route path={"/profile"} element={<ProfilePage />} />
        <Route path={"/profile/bio"} element={<ProfileBioPage />} />
        <Route path={"/profile/bid"} element={<ProfileBidPage />} />
        <Route path={"profile/responses"} element={<ResponsesPage />} />
        <Route
          path={"/profile/bid/active"}
          element={<ProfileActiveBidPage />}
        />
        <Route
          path={"/profile/bid/progress"}
          element={<ProfileProgressBidPage />}
        />
        <Route
          path={"/profile/bid/closed"}
          element={<ProfileCompleteBidPage />}
        />
        <Route path={"/map"} element={<MapComponent />} />
        <Route path={"/chat"} element={<ChatPage />} />
        <Route path={"/bid/:id"} element={<BidPage />} />
        <Route path={"/certificates"} element={<CertificateList />} />
      </Routes>
    </>
  );
}

export default App;
