// BusSearchBar.jsx
// import React, { useState } from 'react';
// import './BusSearchBar.css'
// import { CgSearch } from "react-icons/cg";
// import { LuCalendarDays } from "react-icons/lu";
// import { FaArrowRightArrowLeft } from "react-icons/fa6";

// const BusSearchBar = () => {
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState('2025-09-17');
//   const [isWomenBooking, setIsWomenBooking] = useState(false);

//   const swapCities = () => {
//     setFrom(to);
//     setTo(from);
//   };

//   return (
//     <div className='bus-search-main-container'>
//       <div className="bus-search-container">
//         <div className='bus-search-content'>
//           <div className='bus-to-date'>
//             <div className='from'>
//               <div className="location">
//                 <span role="img" aria-label="bus"></span>
//                 <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder='From' />
//               </div>
//             </div>
//             <div className='swap'>
//               <button className="swap-btn" onClick={swapCities}><FaArrowRightArrowLeft /></button>
//             </div>
//             <div className='to'>
//               <div className="location">
//                 <span role="img" aria-label="bus"></span>
//                 <input value={to} onChange={(e) => setTo(e.target.value)} placeholder='To' />
//               </div>
//             </div>

//             <div className="date-picker">
//               <label><LuCalendarDays />Date of Journey</label>
//               <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//               <button onClick={() => setDate(new Date().toISOString().split('T')[0])}>Today</button>
//               <button onClick={() => {
//                 const tomorrow = new Date();
//                 tomorrow.setDate(tomorrow.getDate() + 1);
//                 setDate(tomorrow.toISOString().split('T')[0]);
//               }}>Tomorrow</button>
//             </div>
//           </div>

//           <div className="toggle-container">
//             <label>
//               <span role="img" aria-label="woman"></span> Booking for women
//             </label>
//             <label className="switch">
//               <input type="checkbox" checked={isWomenBooking} onChange={() => setIsWomenBooking(!isWomenBooking)} />
//               <span className="slider round"></span>
//             </label>
//           </div>
//         </div>
//         <button className="search-btn"><CgSearch /> Search buses</button>
//       </div>
//     </div>
//   );
// };

// export default BusSearchBar;


import { useState } from "react";
import femaleicon from '../assets/female.svg';
import './BusSearchBar.css';

export default function BusSearchBar() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isWomenBooking, setIsWomenBooking] = useState(false);

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 -mt-16 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-black/20 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_auto] gap-3 items-end Bussearch">

          {/* From Input */}
          <div className="relative w-full">
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From"
              className="w-full h-12 pl-4 pr-4 rounded-lg border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Swap Button */}
          <div
            className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={swapCities}
          >
            <span className="material-symbols-outlined text-primary">swap_vert</span>
          </div>

          {/* To Input */}
          <div className="relative w-full">
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To"
              className="w-full h-12 pl-4 pr-4 rounded-lg border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Date Input */}
          <div className="relative w-full">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-12 pl-4 pr-4 rounded-lg border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Women Booking Toggle */}
          <div className="flex items-center justify-center">
            <input
              id="women-booking"
              type="checkbox"
              checked={isWomenBooking}
              onChange={(e) => setIsWomenBooking(e.target.checked)}
              className="hidden"
            />
            <label
              htmlFor="women-booking"
              className={`flex items-center h-12 px-4 rounded-lg border border-gray-300 dark:border-white/20 cursor-pointer transition-colors ${isWomenBooking ? "bg-primary text-white" : "bg-gray-100 dark:bg-white/10 hover:bg-primary/10 dark:hover:bg-primary/20"
                }`}
            >
              <img src={femaleicon} alt="" width={24} height={24} />
              <div className="text-sm font-medium">Booking for Women</div>
              <div>
                <a>
                  Learn Know
                </a>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <button className="h-16 w-56 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 shadow-lg transition-colors">
          Search Buses
        </button>
      </div>
    </div>
  );
}
