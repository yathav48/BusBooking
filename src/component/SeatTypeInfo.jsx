// import seater from "../assets/seater.svg";
// import sleeper from "../assets/sleeper.svg";
// import maleseater from "../assets/male_seater.svg";
// import malesleeper from "../assets/male_sleeper.svg";
// import sleeperbooked from "../assets/sl_booked.svg";
// import seaterbooked from "../assets/seater_booked.svg";
// // import maleseaterbooked from "../assets/male_seater_booked.svg";
// export default function SeatTypeInfo() {

//   return (
//     <div className="my-4">
//         <div className="text-center font-bold text-black text-xl">
//             Know your seat types
//         </div>
//         <div className="mt-2 space-y-2 text-sm text-gray-600">
//             <table className="w-full border-collapse border border-black rounded-xl!">
//                 <thead>
//                     <tr className="flex flex-row border-b! p-4">
//                         <th className="w-[55%]">Seat Type</th>
//                         <th className="w-[25%] text-right!">Seater</th>
//                         <th className="w-[25%] text-right!">Sleeper</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr className="flex flex-row p-4 items-center">
//                         <td className="w-[55%]">Available</td>
//                         <td className="w-[25%] flex justify-end"><img src={seater} alt="Seater" className="w-8 h-8" /></td>
//                         <td className="w-[25%]"><img src={sleeper} alt="Sleeper" size={12} /></td>
//                     </tr>
//                     <tr className="flex flex-row items-center p-4">
//                         <td className="">Available only for male passenger</td>
//                         <td className=""><img src={maleseater} alt="Male Seater" className="w-8 h-8" /></td>
//                         <td className=""><img src={malesleeper} alt="Male Sleeper" className="w-8 h-8" /></td>
//                     </tr>
//                     <tr className="flex flex-row items-center p-4">
//                         <td className="">Already booked</td>
//                         <td className=""><img src={seaterbooked} alt="Seater Booked" className="w-8 h-8" /></td>
//                         <td className=""><img src={sleeperbooked} alt="Sleeper Booked" className="w-8 h-8" /></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     </div>
//   );
// }

import seater from "../assets/seater.svg";
import sleeper from "../assets/sleeper.svg";
import maleseater from "../assets/male_seater.svg";
import malesleeper from "../assets/male_sleeper.svg";
import sleeperbooked from "../assets/sl_booked.svg";
import seaterbooked from "../assets/seater_booked.svg";

export default function SeatTypeInfo() {
  return (
    <div className="my-4">
      <div className="text-center font-bold text-black text-xl">
        Know your seat types
      </div>

      <div className="mt-4 text-sm border border-gray-500 rounded-lg overflow-hidden divide-y divide-gray-500/20">

        <div className="flex font-semibold p-4">
          <div className="w-[55%]">Seat Type</div>
          <div className="w-[22.5%] flex justify-end">Seater</div>
          <div className="w-[22.5%] flex justify-end">Sleeper</div>
        </div>

        <div className="flex items-center p-4">
          <div className="w-[55%]">Available</div>
          <div className="w-[22.5%] flex justify-end px-2">
            <img src={seater} alt="Seater" className="w-7 h-7" />
          </div>
          <div className="w-[22.5%] flex justify-end px-2">
            <img src={sleeper} alt="Sleeper" />
          </div>
        </div>

        <div className="flex items-center p-4">
          <div className="w-[55%]">Available only for male passenger</div>
          <div className="w-[22.5%] flex justify-end px-2">
            <img src={maleseater} alt="Male Seater" className="w-7 h-7" />
          </div>
          <div className="w-[22.5%] flex justify-end px-2">
            <img src={malesleeper} alt="Male Sleeper" />
          </div>
        </div>

        <div className="flex items-center p-4">
          <div className="w-[55%]">Already booked</div>
          <div className="w-[22.5%] flex justify-end px-2">
            <img src={seaterbooked} alt="Seater Booked" className="w-7 h-7" />
          </div>
          <div className="w-[22.5%] flex justify-end px-2">
            <img src={sleeperbooked} alt="Sleeper Booked" />
          </div>
        </div>

      </div>
    </div>
  );
}
