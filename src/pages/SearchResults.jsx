import buses from "../busdata/buses";
import BusCard from "../component/BusCard";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BusSearchBar from "../component/BusSearchBar";
import wavesimg from "../assets/waves-img.svg";
import { motion } from "framer-motion";
import "../pages/scrollbar.css";
import SeatSelectionDrawer from "../component/SeatSelectionDrawer";
import { IoArrowForward } from "react-icons/io5";
import FilterButton from "../component/FilterButton";

function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const [filters, setFilters] = useState({
    acType: {
      ac: false,
      nonAc: false,
    },
    busType: {
      sleeper: false,
      seater: false,
    },
    time: {
      morning: false,
      night: false,
    },
  });

  const [selectedBus, setSelectedBus] = useState(null);
  const [isSeatOpen, setIsSeatOpen] = useState(false);

  const filteredBuses = buses.filter((bus) => {
    const busFrom = bus.route?.from?.toLowerCase().trim();
    const busTo = bus.route?.to?.toLowerCase().trim();

    if (!busFrom || !busTo) return false;

    return (
      busFrom === from.toLowerCase().trim() && busTo === to.toLowerCase().trim()
    );
  });

  const handleViewSeats = (bus) => {
    setSelectedBus(bus);
    setIsSeatOpen(true);
    document.body.style.overflow = "hidden";
  };
  const handleCloseSeats = () => {
    setIsSeatOpen(false);
    setSelectedBus(null);
    document.body.style.overflow = "auto";
  };

  const [sortedBuses, setSortedBuses] = useState(filteredBuses);
  const applyFilters = (buses, filters) => {
    return buses.filter((bus) => {
      // AC Filter
      const acSelected = filters.acType.ac || filters.acType.nonAc;
      if (acSelected) {
        if (
          !(
            (filters.acType.ac && bus.comfort?.ac === true) ||
            (filters.acType.nonAc && bus.comfort?.ac === false)
          )
        ) {
          return false;
        }
      }

      // Bus Type Filter
      const typeSelected = filters.busType.sleeper || filters.busType.seater;
      if (typeSelected) {
        if (
          !(
            (filters.busType.sleeper && bus.busType === "SLEEPER") ||
            (filters.busType.seater && bus.busType === "SEATER")
          )
        ) {
          return false;
        }
      }

      // Time Filter
      const timeSelected = filters.time.morning || filters.time.night;
      if (timeSelected) {
        const hour = parseInt(bus.departureTime.split(":")[0], 10);
        const isMorning = hour >= 5 && hour < 12;
        const isNight = hour >= 20 || hour < 5;
        if (
          !(
            (filters.time.morning && isMorning) ||
            (filters.time.night && isNight)
          )
        ) {
          return false;
        }
      }

      return true;
    });
  };
  const visibleBuses = applyFilters(sortedBuses, filters);
  const counts = {
    ac: visibleBuses.filter((b) => b.comfort?.ac === true).length,
    nonAc: visibleBuses.filter((b) => b.comfort?.ac === false).length,
    sleeper: visibleBuses.filter((b) => b.busType === "SLEEPER").length,
    seater: visibleBuses.filter((b) => b.busType === "SEATER").length,
  };

  useEffect(() => {
    setSortedBuses(filteredBuses);
    document.title = `${from} to ${to} | Bus Ticket Booking`;
  }, [from, to]);

  const sortByPrice = () => {
    const sorted = [...sortedBuses].sort(
      (a, b) => a.pricing.baseFare - b.pricing.baseFare,
    );
    setSortedBuses(sorted);
  };

  const sortByDeparture = () => {
    const sorted = [...sortedBuses].sort((a, b) =>
      a.departureTime.localeCompare(b.departureTime),
    );
    setSortedBuses(sorted);
  };

  const pageTransition = {
    initial: { x: "100vw", opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 1 },
  };

  const handleSort = (sortType) => {
    switch (sortType) {
      case "price":
        sortByPrice();
        break;
      case "departure":
        sortByDeparture();
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", duration: 0.45, ease: "easeOut" }}
      className="absolute inset-0 z-50 bg-white"
    >
      <div className="max-w-7xl mx-auto bg-white">
        <div className="flex flex-col lg:flex-row gap-3 justify-between my-3">
          <div className="flex items-center gap-4 border-b border-gray-300 lg:border-none w-full px-2 py-1">
            {/* Back Arrow */}
            <button
              onClick={() => {
                const params = new URLSearchParams({ from, to, date });
                navigate(`/?${params.toString()}`);
              }}
              className=""
            >
              <IoArrowBack size={22} />
            </button>

            {/* Route Info */}
            <div>
              <div className="text-xl font-bold flex items-center gap-2">
                {from}{" "}
                <i className="text-gray-300 pt-1">
                  <IoArrowForward />
                </i>{" "}
                {to}
              </div>
              <p className="text-md text-gray-500 m-0">
                {date ? new Date(date).toDateString() : ""} |{" "}
                {filteredBuses.length} Buses
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500 capitalize px-3">
            {from} to {to} buses
          </div>
        </div>
        <div className="py-4 hidden lg:block">
          <div className="mt-4">
            <BusSearchBar
              initialFrom={from}
              initialTo={to}
              initialDate={date}
            />
          </div>
        </div>
      </div>

      {/* top filter panel (mobile screen) */}
      <div className="sticky top-0 bg-white py-2 lg:hidden">
        <div className="flex gap-2 items-center py-1">
          <div className="text-md font-semibold border border-gray-400 px-2 py-1 rounded-lg mx-2">
            Filters
          </div>
          <div className="flex overflow-x-scroll gap-2 scrollbar-hide">
            <div>
              <FilterButton
                label="AC"
                count={counts.ac}
                active={filters.acType.ac}
                onClick={() =>
                  setFilters({
                    ...filters,
                    acType: {
                      ...filters.acType,
                      ac: !filters.acType.ac,
                    },
                  })
                }
              />
            </div>
            <div>
              <FilterButton
                label="Non-AC"
                count={counts.nonAc}
                active={filters.acType.nonAc}
                onClick={() =>
                  setFilters({
                    ...filters,
                    acType: {
                      ...filters.acType,
                      nonAc: !filters.acType.nonAc,
                    },
                  })
                }
              />
            </div>
            <div>
              <FilterButton
                label="SLEEPER"
                count={counts.sleeper}
                active={filters.busType.sleeper}
                onClick={() =>
                  setFilters({
                    ...filters,
                    busType: {
                      ...filters.busType,
                      sleeper: !filters.busType.sleeper,
                    },
                  })
                }
              />
            </div>
            <div>
              <FilterButton
                label="SEATER"
                count={counts.seater}
                active={filters.busType.seater}
                onClick={() =>
                  setFilters({
                    ...filters,
                    busType: {
                      ...filters.busType,
                      seater: !filters.busType.seater,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-200 h-fit">
        <div className="flex flex-col lg:flex-row gap-4 pb-2 max-w-7xl mx-auto">
          {/* LEFT FILTER PANEL (laptop screen) */}
          <div className="overflow-y-auto scrollbar-hide h-[80vh] hidden lg:block pt-4">
            <div className="w-full shrink-0 border border-gray-300 rounded-lg p-4 bg-white shadow-lg flex-col flex">
              <div className="flex flex-row justify-between border-b border-gray-300">
                <div className="font-bold mb-3 text-black text-2xl">
                  Filter buses
                </div>
                <div>
                  <button
                    className="text-black font-semibold underline px-2 py-1 hover:text-red-700!"
                    onClick={() =>
                      setFilters({
                        acType: { ac: false, nonAc: false },
                        busType: { sleeper: false, seater: false },
                        time: { morning: false, night: false },
                      })
                    }
                  >
                    Clear all
                  </button>
                </div>
              </div>
              <div className="flex my-4 gap-4 overflow-x-auto scrollbar-hide flex-col">
                <div className="flex items-center gap-2">
                  <FilterButton
                    label="AC"
                    count={counts.ac}
                    active={filters.acType.ac}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        acType: {
                          ...filters.acType,
                          ac: !filters.acType.ac,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FilterButton
                    label="Non-AC"
                    count={counts.nonAc}
                    active={filters.acType.nonAc}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        acType: {
                          ...filters.acType,
                          nonAc: !filters.acType.nonAc,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FilterButton
                    label="SLEEPER"
                    count={counts.sleeper}
                    active={filters.busType.sleeper}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        busType: {
                          ...filters.busType,
                          sleeper: !filters.busType.sleeper,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FilterButton
                    label="SEATER"
                    count={counts.seater}
                    active={filters.busType.seater}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        busType: {
                          ...filters.busType,
                          seater: !filters.busType.seater,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <button
                    className={`px-4 py-1 border-1 rounded-lg! 
    ${
      filters.morning
        ? "bg-red-700 text-white border-red-500"
        : "bg-white text-black border-gray-400"
    }`}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        time: {
                          ...filters.time,
                          morning: !filters.time.morning,
                        },
                      })
                    }
                  >
                    <div>(5 AM – 12 PM)</div>
                    <div>Moring</div>
                  </button>
                </div>

                {/* Night */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    className={`px-4 py-1 border-1 rounded-lg! 
    ${
      filters.night
        ? "bg-red-700 text-white border-red-500"
        : "bg-white text-black border-gray-400"
    }`}
                    onClick={() =>
                      setFilters({ ...filters, night: !filters.night })
                    }
                  >
                    Night (8 PM – 5 AM)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BUS LIST (SCROLL ONLY HERE) */}
          <div className="flex flex-1 flex-col overflow-y-auto scrollbar-hide h-[90vh] py-4">
            {/* Sorting Options */}
            <div className="flex flex-col lg:px-3!">
              <div className="flex-row justify-between bg-amber-200 p-2 rounded-lg hidden md:flex">
                <div className="text-black font-semibold">
                  {filteredBuses.length} buses found
                </div>
                <div className="flex flex-row items-center gap-2 font-semibold">
                  <div>Sort by:</div>
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => handleSort("price")}
                      className="py-1 px-1 rounded-full text-sm"
                    >
                      Price
                    </button>

                    <button
                      onClick={() => handleSort("departure")}
                      className="py-1 px-1 rounded-full text-sm"
                    >
                      Departure
                    </button>

                    <button
                      onClick={() => handleSort("seats")}
                      className="py-1 px-1 rounded-full text-sm"
                    >
                      Seats
                    </button>
                  </div>
                </div>
              </div>
              <div
                style={{ backgroundImage: `url(${wavesimg})` }}
                className="w-full"
              >
                <div className="text-center text-sm">
                  <strong>3.6+ lakh </strong>bus routes on redbus
                </div>
              </div>
            </div>
            {visibleBuses.length === 0 ? (
              <p>No buses available</p>
            ) : (
              <div className="flex flex-col gap-4 mt-4 px-3">
                {visibleBuses.map((bus) => (
                  <div key={bus.id}>
                    <BusCard bus={bus} onViewSeats={handleViewSeats} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {isSeatOpen && (
          <SeatSelectionDrawer
            bus={selectedBus}
            from={from}
            to={to}
            onClose={handleCloseSeats}
          />
        )}
      </div>
    </motion.div>
  );
}

export default SearchResults;
