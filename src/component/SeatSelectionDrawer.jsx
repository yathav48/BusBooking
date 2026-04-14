// import { IoClose } from "react-icons/io5";
// import { motion } from "framer-motion";
// import SeatLayout from "./SeatLayout";
// import { useState, useEffect } from "react";
// function SeatSelectionDrawer({ bus, from, to, onClose }) {
//     const [seats, setSeats] = useState([]);

//     useEffect(() => {
//     if (bus) {
//       // mock seat generation
//       const generatedSeats = Array.from({ length: 32 }, (_, i) => ({
//         id: i + 1,
//         label: `S${i + 1}`,
//         isBooked: Math.random() < 0.3
//       }));
//       setSeats(generatedSeats);
//     }
//   }, [bus]);

//   if (!bus) return null;
//     return (
//         <>
//             {/* Overlay */}
//             <div
//                 className="fixed inset-0 bg-black/40 z-40"
//                 onClick={onClose}
//             />

//             {/* Drawer */}
//             <motion.div
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 exit={{ y: "100%" }}
//                 transition={{ type: "tween", duration: 0.5 }}
//                 className="fixed bottom-0 left-0 right-0 h-[90vh] bg-white z-50 rounded-t-2xl p-4 animate-slideUp">

//                 {/* Header */}
//                 <div className="flex items-center border-b pb-3 gap-3">
//                     <button onClick={onClose} className="text-2xl">
//                         <IoClose size={32} />
//                     </button>
//                     <div>
//                         <h2 className="font-bold text-lg">
//                             {from} → {to}
//                         </h2>
//                     </div>
//                 </div>

//                 <div className="mt-4 overflow-y-auto h-[calc(90vh-80px)]">
//                     <SeatLayout seats={seats} />
//                 </div>
//             </motion.div>
//         </>
//     );
// }

// export default SeatSelectionDrawer;

import { useMemo, useState } from "react";
import { generateSeats } from "../utils/generateSeats";
import SeatDeck from "./SeatDeck";
import BusDetails from "./BusDetails";
import PriceBar from "./PriceBar";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import SeatLimitInfo from "./SeatLimitInfo";
import seaterror from "../assets/seatError.svg";
import { PiSteeringWheelFill } from "react-icons/pi";
import SeatTypeInfo from "./SeatTypeInfo";

function SeatSelectionDrawer({ bus, from, to, onClose }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const MAX_SEATS = 6;
  const [limitReached, setLimitReached] = useState(false);

  const allSeats = useMemo(() => {
    if (!bus) return [];
    return generateSeats({
      busType: bus.busType,
      layoutConfig: bus.layoutConfig,
      pricing: bus.pricing
    });
  }, [bus]);

  const lowerDeckSeats = allSeats.filter(seat => seat.deck === "LOWER");
  const upperDeckSeats = allSeats.filter(seat => seat.deck === "UPPER");

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose} />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 h-[90vh] bg-white z-50 rounded-t-2xl animate-slideUp">

        <div className="flex items-center border-b border-gray-400 p-3 gap-3 mb-2">
          <button onClick={onClose} className="text-2xl">
            <IoClose size={32} />
          </button>
          <div>
            <h2 className="font-bold text-lg">
              {from} → {to}
            </h2>
          </div>
        </div>
        <div className="py-4 px-4 bg-gray-100">
          <div className="flex flex-col md:flex-row justify-around items-center gap-4">
            <div className="overflow-y-auto h-[70vh] w-full scrollbar-hide">

              <div className="flex flex-row gap-4 items-center justify-center">
                <div className="bg-white px-3 py-2 rounded-xl h-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-black font-bold text-md">Lower deck</div>
                    <div><PiSteeringWheelFill size={30} className="text-gray-600" /></div>
                  </div>
                  {lowerDeckSeats.length > 0 && (
                    <SeatDeck
                      title="Lower Deck"
                      seats={lowerDeckSeats}
                      busType={bus.busType}
                      singleSeatSide={bus.layoutConfig.singleSeatSide}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                      maxSeats={MAX_SEATS}
                      setLimitReached={setLimitReached}
                    />
                  )}
                </div>
                <div className="bg-white px-3 py-2 rounded-lg">
                  <div className="flex mb-4">
                    <div className="text-black font-bold text-md">Upper deck</div>
                  </div>
                  {upperDeckSeats.length > 0 && (
                    <SeatDeck
                      title="Upper Deck"
                      seats={upperDeckSeats}
                      busType={bus.busType}
                      singleSeatSide={bus.layoutConfig.singleSeatSide}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                      maxSeats={MAX_SEATS}
                      setLimitReached={setLimitReached}
                    />
                  )}
                </div>
              </div>
              <div>
                <SeatTypeInfo />
              </div>
            </div>
            <div>
              <SeatLimitInfo open={limitReached} onClose={() => setLimitReached(false)}>
                <div className="flex flex-col items-center p-4">
                  <div className="flex justify-end w-full cursor-pointer" onClick={() => setLimitReached(false)}>
                    <IoClose size={26} /></div>
                  <img src={seaterror} alt="Seat Limit Reached" className="w-28 h-28 mb-4" />
                  <div className="text-center text-black font-bold text-2xl">
                    You can select a maximum of
                  </div>
                  <div className="text-amber-700 text-xl font-bold">{MAX_SEATS} Seats</div>
                  <div className="flex w-full justify-center py-2 mt-4 bg-red-600 text-white rounded-full cursor-pointer" onClick={() => setLimitReached(false)}>
                    <p className="m-0 font-bold text-white">Okay</p>
                  </div>
                </div>
              </SeatLimitInfo>
            </div>

            <div className="col-span-5 w-full">
              <BusDetails bus={bus} selectedSeats={selectedSeats} />
            </div>
          </div>
        </div>
        <PriceBar bus={bus} selectedSeats={selectedSeats} />
      </motion.div>


    </>
  );
}

export default SeatSelectionDrawer;
