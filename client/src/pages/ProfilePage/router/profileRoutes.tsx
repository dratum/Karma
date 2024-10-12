import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../../../components/NavBarProfile/components/NavBar";
import { ProfileDashboard } from "../../../modules/ProfileDashboard";
import { ProfileBidRouter } from "../../../modules/ProfileBids";

const UserRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/profile/bio' Component={ProfileDashboard} />
        <Route path='/profile/bids' Component={ProfileBidRouter} />
        {/* Добавьте другие маршруты для страниц пользователя здесь */}
      </Routes>
    </Router>
  );
};

export default UserRoutes;
