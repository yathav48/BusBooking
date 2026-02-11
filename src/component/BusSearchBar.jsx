import { useState, useEffect } from "react";
import femaleicon from "../assets/female.svg";
import { Link } from "react-router-dom";
import { IoMdSwap } from "react-icons/io";
import "./BusSearchBar.css";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdOutlineSwapVert } from "react-icons/md";
import { MdOutlineDirectionsBus } from "react-icons/md";
import WomenBookingmodal from "./WomenBookingmodal";
import { motion } from "framer-motion";
import CustomDatePicker from "./CustomDatePicker";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BusSearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { searchData, setSearchData } = useSearch();
  const { from, to, date, womenBooking } = searchData;
  const [isSwapped, setIsSwapped] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showWomenModal, setShowWomenModal] = useState(false);

  const handleSearch = () => {
    if (!from || !to) {
      toast.error("Please enter the source and destination", {
        icon: false,
        closeButton: false,
        position: "bottom-center",
        autoClose: 3000,
        style: {
          // background: "#f43f5e",
          // color: "white",
          fontWeight: "bold",
        },
      });
      return;
    }
    navigate(
      `/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date || ""}`,
    );
  };

  useEffect(() => {
    const fromQ = searchParams.get("from");
    const toQ = searchParams.get("to");
    const dateQ = searchParams.get("date");

    if (fromQ || toQ || dateQ) {
      setSearchData((prev) => ({
        ...prev,
        from: fromQ || "",
        to: toQ || "",
        date: dateQ || null,
      }));
    }
  }, []);

  const swapCities = () => {
    setSearchData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));

    setRotation((prev) => prev + 180);
  };

  return (
    <div className="relative md:px-4! -mt-16 max-w-7xl mx-auto bottom-14 bussearch-container">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="bg-white md:dark:bg-black/20 rounded-2xl md:shadow-lg px-4 pt-2 md:pt-4! pb-12! min-h-[120px] relative overflow-visible"
      >
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          {/* Inputs Grid */}
          <div className="relative w-full md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 flex-1 border border-gray-500 rounded-2xl lg:divide-x divide-gray-300">
            {/* From Input */}
            <div className="relative w-full px-4 py-2 border-b border-gray-300 md:border-b-0 flex flex-row items-center gap-2 ">
              <div>
                <i className="text-2xl text-gray-500">
                  <MdOutlineDirectionsBus />
                </i>
              </div>
              <div>
                <input
                  type="text"
                  value={from}
                  onChange={(e) =>
                    setSearchData({ ...searchData, from: e.target.value })
                  }
                  placeholder="From"
                  className="w-full h-12 p-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Swap Button large and medium screen*/}
            <div
              className="absolute z-10 md:left-1/2 lg:left-1/3 -translate-x-1/2 cursor-pointer bg-black/80 rounded-full shadow-lg w-9 h-9 md:top-3 lg:inset-y-1/5 items-center justify-center rotate-90 md:rotate-0 hidden md:flex"
              onClick={() => {
                swapCities();
              }}
            >
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-fit"
              >
                <IoMdSwap className="w-5 h-5 fill-white" />
              </motion.div>
            </div>

            {/* swap button mobile screen */}
            <div
              className="absolute flex items-center justify-center w-9 h-9 bg-black/80 cursor-pointer rounded-full right-4 -translate-y-1/2 md:hidden"
              onClick={swapCities}
            >
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-fit"
              >
                <MdOutlineSwapVert className="w-5 h-5 fill-white" />
              </motion.div>
            </div>

            {/* To Input */}
            <div className="relative w-full px-4 py-2 flex flex-row items-center gap-2 md:border-l">
              <div>
                <i className="text-2xl text-gray-500">
                  <MdOutlineDirectionsBus />
                </i>
              </div>
              <div>
                <input
                  type="text"
                  value={to}
                  onChange={(e) =>
                    setSearchData({ ...searchData, to: e.target.value })
                  }
                  placeholder="To"
                  className="w-full h-12 p-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="relative w-full sm:col-span-2 lg:col-span-1 p-2 border-t border-gray-300 lg:border-t-0">
              {/* Calendar popup */}
              {/* {showCalendar && (
                <div className="absolute left-0 top-16 bg-white shadow-lg rounded-xl border p-4 z-1">
                  <DayPicker
                    mode="single"
                    selected={selected}
                    locale={enIN}
                    onSelect={(day) => {
                      setSelected(day);
                      setShowCalendar(false);
                    }}
                    components={{
                      Weekday: CustomWeekday,
                      Caption: CustomCaption,
                      Navigation: CustomNavbar,
                    }}
                    fromDate={new Date()}
                    modifiersClassNames={{
                      selected: "bg-black text-white rounded-full",
                      today: "bg-gray-200 rounded-full",
                    }}
                    
                  />
                  {footer}
                </div>
              )} */}
              <CustomDatePicker
                selected={date}
                onSelect={(d) => setSearchData({ ...searchData, date: d })}
              />
            </div>

            {/* Women Booking Toggle */}
          </div>
          <div className="flex flex-row items-center justify-between w-full lg:w-[320px] gap-2 lg:gap-4 women-toggle rounded-2xl p-2 border border-gray-300">
            <div className="flex items-center gap-3">
              <img
                src={femaleicon}
                alt=""
                width={20}
                height={20}
                className="w-7 h-7"
              />
              <div className="flex flex-col leading-tight">
                <div className="text-base font-medium">Booking for Women</div>
                <Link
                  onClick={() => setShowWomenModal(true)}
                  className="text-sm text-blue-500"
                >
                  know more
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  const newValue = !womenBooking;
                  setSearchData({ ...searchData, womenBooking: newValue });
                  if (!womenBooking) {
                    setShowWomenModal(true);
                  }
                }}
                className={`relative w-14 h-8 flex items-center transition-colors duration-300 rounded-full! border-3 border-gray-600
              ${womenBooking ? "bg-red-600 border-none" : "bg-gray-300"}`}
              >
                <span
                  className={`w-4 h-4 bg-gray-600 rounded-full shadow-md transform transition-transform duration-300
              ${womenBooking ? "translate-x-7 bg-white w-6 h-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        </div>
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="absolute left-1/2 -translate-x-1/2 translate-y-1/2
                     w-full sm:w-80 h-12 text-white px-4 md:px-0!"
        >
          <div className="flex items-center justify-center gap-2 bg-red-700 w-full h-12 hover:bg-primary-dark transition-colors shadow-lg rounded-full">
            <span className="material-symbols-outlined">search</span>
            <span className="sm:inline font-semibold">Search Buses</span>
          </div>
        </button>
      </motion.div>
      {showWomenModal && (
        <WomenBookingmodal onClose={() => setShowWomenModal(false)} />
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeButton={false}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="bg-white"
        style={{ width: "auto", maxWidth: "95%" }}
      />
    </div>
  );
}
