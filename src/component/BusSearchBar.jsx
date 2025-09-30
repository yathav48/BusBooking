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
import { Link } from "react-router-dom";

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
    <div className="relative px-4 sm:px-6 lg:px-8 -mt-16 max-w-7xl mx-auto bottom-13">
      <div className="bg-white dark:bg-black/20 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 min-h-[130px] relative overflow-visible pb-32">
        <div className="flex gap-8 flex-wrap items-center">
          {/* Inputs Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">

            {/* From Input */}
            <div className="relative w-full">
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From"
                className="w-full h-12 pl-4 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Swap Button */}
            <div className="absolute left-[32.5%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
              onClick={swapCities}>
              <span className="material-symbols-outlined text-primary">
                swap_horiz
              </span>
            </div>

            {/* To Input */}
            <div className="relative w-full">
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To"
                className="w-full h-12 pl-4 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Date Input */}
            <div className="relative w-full">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-12 pl-4 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>


          {/* Women Booking Toggle */}
          <div className="flex items-center justify-between w-full md:w-[320px] ml-auto gap-4 women-toggle">
            <div className="flex items-center gap-3v float-left">
              <img src={femaleicon} alt="" width={20} height={20} className="w-7 h-7 mt-1" />
              <div className="flex flex-col leading-tight">
                <div className="text-base font-medium">Booking for Women</div>
                <Link className="text-sm text-blue-500">know more</Link>
              </div>
            </div>
            
            <div className="flex items-center border p-2 rounded-3xl border-color-black/20 dark:border-black">
              <button
                type="button"
                onClick={() => setIsWomenBooking(!isWomenBooking)}
                className={`relative w-14 h-8 flex items-center rounded-[1rem] transition-colors duration-300
              ${isWomenBooking ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
              ${isWomenBooking ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button className="absolute left-1/2 -translate-x-1/2 translate-y-1/2
                     w-45 sm:w-65 h-12 sm:h-14 bg-primary text-white
                     rounded-full hover:bg-primary-dark transition-colors 
                     flex items-center justify-center gap-2 shadow-lg">
          <span className="material-symbols-outlined">search</span>
          <span className="hidden sm:inline ">Search Buses</span>
        </button>
      </div>
    </div >
  );
}
