import { IoMdClose } from "react-icons/io";
import womensicon1 from "../assets/womensonly.svg";
import womensicon2 from "../assets/womenbooking.svg";
import womensicon3 from "../assets/womenbookingwhy.svg";
import womensicon4 from "../assets/womenpickuptodrop.svg";
import "./Womenbooking.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";

import { motion } from "framer-motion";

const carouselImages = [
  { id: 1, image: womensicon1 },
  { id: 2, image: womensicon2 },
  { id: 3, image: womensicon3 },
  { id: 4, image: womensicon4 },
];

export default function WomenBookingmodal({ onClose }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pt-4 md:p-0!">
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ type: "tween", duration: 1, ease: "easeOut" }}
        className="bg-white rounded-t-2xl md:rounded-2xl shadow-lg w-full md:max-w-[480px] flex flex-col py-2 h-full md:h-fit mt-[3rem]! md:m-0!"
      >
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            className="hover:bg-gray-200 py-1 px-2 !rounded-2xl"
          >
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col overflow-y-auto h-[66vh] md:h-fit scrollbar-hide">
            <div className="px-2 flex flex-col gap-2">
              <div className="text-3xl font-bold text-black text-center">
                Booking for women
              </div>
              <p className="text-gray-600 text-center text-sm">
                Providing helpful details to smartly choose bus travel for women
              </p>
            </div>

            <div className="px-4 relative">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                slidesPerView={1}
                className="pill-swiper py-4"
              >
                {carouselImages.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={`Image ${item.id}`}
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                ref={prevRef}
                className="disabled:opacity-0.3 absolute left-2 top-1/2 -translate-y-1/2
             w-10 h-10 !rounded-full bg-pink-200 shadow
             items-center justify-center
             text-black z-20 hidden md:flex"
              >
                <IoIosArrowBack />
              </button>

              <button
                ref={nextRef}
                className="absolute right-2 top-1/2 -translate-y-1/2
             w-10 h-10 !rounded-full bg-pink-200 shadow
             items-center justify-center
             text-black z-20 hidden md:flex"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>

          <div className="flex py-2 items-center px-4">
            <button
              className="mt-6 w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-2 !rounded-full font-semibold"
              onClick={onClose}
            >
              Got it
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
