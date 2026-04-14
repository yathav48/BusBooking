// import { motion } from "framer-motion";
// export default function PriceBar({ selectedSeats }) {
//     if (selectedSeats.length === 0) return null;

//     const seatCount = selectedSeats.length;
//     const totalPrice = selectedSeats.reduce(
//         (sum, seat) => sum + seat.price,
//         0
//     );
//     return (
//         <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "tween", duration: 0.8 }}
//             className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
//             <div className="flex flex-row justify-center p-2 gap-4 items-center">

//                 {/* LEFT */}
//                 <div className="flex flex-row gap-4">
//                     <div>
//                         <p className="text-sm text-gray-500 m-0">
//                             {seatCount} Seat{seatCount > 1 ? "s" : ""} Selected
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-lg font-bold m-0">
//                             ₹ {totalPrice}
//                         </p>
//                     </div>
//                 </div>

//                 {/* RIGHT */}
//                 <button className="bg-red-600 text-white px-4 py-2 rounded-full! font-semibold">
//                     select boarding & dropping point
//                 </button>

//             </div>
//         </motion.div>
//     )
// }
import { motion } from "framer-motion";
export default function PriceBar({ bus, selectedSeats }) {
  if (selectedSeats.length === 0) return null;

  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const seatCount = selectedSeats.length;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", duration: 0.8 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50">
      <div className="flex flex-col md:flex-row justify-center p-3 gap-1 md:gap-4! items-center">

        <div className="flex gap-4">
          <div className="text-md font-semibold">{seatCount} seat{seatCount > 1 ? "s" : ""}</div>
          <div className="text-black text-xl font-bold">₹{total}</div>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-full! font-bold w-full md:w-fit">
          Select boarding & dropping point
        </button>
      </div>
    </motion.div >
  );
}
