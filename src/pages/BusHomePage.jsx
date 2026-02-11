import { useEffect } from "react";
import AboutContainer from "../component/AboutContainer";
import BottomNavbar from "../component/BottomNavbar";
import BusSearchBar from "../component/BusSearchBar";
import FestivalBooking from "../component/FestivalBooking";
import Footer from "../component/Footer";
import ParagraphContent from "../component/ParagraphContent";
import { motion } from "framer-motion";
import femaleicon from '../assets/femaleFunnel.svg';
import homebanner from '../assets/HomeBanner.webp';
import { useSearch } from "../contexts/SearchContext";
import { useSearchParams } from "react-router-dom";

export default function Home() {
    const [searchParams] = useSearchParams();
    const { setSearchData } = useSearch();

    useEffect(() => {
        document.title = 'Bus Booking - Online Bus Ticket Booking';
        const from = searchParams.get("from");
        const to = searchParams.get("to");
        const date = searchParams.get("date");
        if (from && to) {
            setSearchData((prev) => ({
                ...prev,
                from,
                to,
                date
            }));
        }
    }, []);

    return (
        <>
            <div className="homepage-layout">
                <div className="px-4 pt-4 flex flex-row justify-between items-center md:hidden">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-black">Bus Tickets</span>
                        <span className="text-sm text-gray-500">Buses preferred by women</span>
                    </div>
                    <i>
                        <img src={femaleicon} alt="femaleicon" />
                    </i>
                </div>
                <div className="homepage-bg relative hidden md:block" style={{ backgroundImage: `url(${homebanner})` }}>
                    <div className="absolute bg-linear inset-0 bg-linear-to-tr from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0)]">
                        <div className="text-white text-capitalize max-w-7xl mx-auto px-3 relative top-15 flex justify-center lg:block md:text-center lg:text-left">
                            <motion.div
                                initial={{ y: 60, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="md:text-4xl lg:text-5xl font-bold w-fit h-fit">india's no:1 online<br /> bus ticket booking site</motion.div>
                        </div>
                    </div>
                </div>
                <BottomNavbar />
                <BusSearchBar />
                <FestivalBooking />
                <ParagraphContent />
                <Footer />
                <AboutContainer />
            </div>
        </>
    )
}