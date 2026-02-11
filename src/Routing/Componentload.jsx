import { Route, Routes, useLocation } from "react-router-dom";
import TrainHomePage from "../pages/TrainHomePage";
import BusHomePage from "../pages/BusHomePage";
import Bookingpage from "../pages/Bookingpage";
import Helppage from "../pages/Helppage";
import Offerpage from "../pages/Offerpage";
import Loginmodal from "../component/Loginmodal";
import AuthForm from "../component/AuthForm";
import SearchResults from "../pages/SearchResults";
import { AnimatePresence, motion } from "framer-motion";

export default function componentload() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0,0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<BusHomePage />} />
          <Route path="/buspage" element={<BusHomePage />} />
          <Route path="/trainpage" element={<TrainHomePage />} />
          <Route path="/bookingpage" element={<Bookingpage />}>
            <Route path="login" element={<Loginmodal />} />
          </Route>
          <Route path="/helppage" element={<Helppage />} />
          <Route path="/offerpage" element={<Offerpage />} />
          <Route path="/registration" element={<AuthForm />} />
          <Route
            path="/search"
            element={
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "tween", duration: 0.45, ease: "easeOut" }}
                className="fixed inset-0 bg-white z-50 overflow-y-auto scrollbar-hide"
              >
                <SearchResults />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
