import { Route, Routes } from "react-router";

import { lazy } from "react";

const BidForm = lazy(() => import("../BidForm/BidForm.tsx"));
const BidPage = lazy(() => import("../Pages/BidPage.tsx"));
const ChatPage = lazy(() => import("../ChatPage/ChatPage.tsx"));

const MainPage = lazy(() =>
  import("../../pages/MainPage/index.ts").then((module) => ({
    default: module.MainPage,
  }))
);
const LoginPage = lazy(() =>
  import("../../pages/LoginPage/index.ts").then((module) => ({
    default: module.LoginPage,
  }))
);
const ProfilePage = lazy(() =>
  import("../../pages/ProfilePage/index.ts").then((module) => ({
    default: module.ProfilePage,
  }))
);
const BidsListPage = lazy(() =>
  import("../../pages/BidsListPage/index.ts").then((module) => ({
    default: module.BidsListPage,
  }))
);
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/index.tsx").then((module) => ({
    default: module.RegistrationPage,
  }))
);

const MapComponent = lazy(() => import("../Map/Map.tsx"));
const CertificateList = lazy(
  () => import("../Certificate/CertificateList.tsx")
);

const ProfileDashboard = lazy(() =>
  import("../../widgets/index.ts").then((module) => ({
    default: module.ProfileDashboard,
  }))
);
const ProfileBidsRouter = lazy(() =>
  import("../../widgets/index.ts").then((module) => ({
    default: module.ProfileBidsRouter,
  }))
);
const ProfileActiveBidPage = lazy(() =>
  import("../../widgets/index.ts").then((module) => ({
    default: module.ProfileActiveBidPage,
  }))
);
const ProfileCompleteBidPage = lazy(() =>
  import("../../widgets/index.ts").then((module) => ({
    default: module.ProfileCompleteBidPage,
  }))
);
const ProfileProgressBidPage = lazy(() =>
  import("../../widgets/index.ts").then((module) => ({
    default: module.ProfileProgressBidPage,
  }))
);
const UserResponsesList = lazy(() =>
  import("../../widgets/index.ts").then((module) => ({
    default: module.UserResponsesList,
  }))
);

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
