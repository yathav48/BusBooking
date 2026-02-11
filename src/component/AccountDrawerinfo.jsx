import RightDrawer from "./RightDrawer"
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import AuthForm from "./AuthForm";
import { TfiMenuAlt } from "react-icons/tfi";
import Nav from 'react-bootstrap/Nav';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loginmodal from "./Loginmodal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AccountDrawerinfo({ openDrawer, setOpenDrawer }) {
    const [showSignin, setShowSignin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const isModalOpen = showSignin || showLogin;

    const location = useLocation();

    useEffect(() => {
        setOpenDrawer(false);
        setShowSignin(false);
        setShowLogin(false);
    }, [location.pathname]);

    return (
        <motion.div
        initial = {{ x: '100%'}}
        animate = {{ x: "0"}}
              transition={{ type: "tween", duration: 0.8 }}>
            <RightDrawer
                open={openDrawer}
                onOpenChange={setOpenDrawer}
                className={`w-full xl:w-1/4 ${isModalOpen ? "pointer-events-none" : "pointer-events-auto"}`}
            >
                <div>
                    <div className='p-4 pb-0'>
                        <div className='text-2xl font-bold text-black mb-4'>Login to manage your booking</div>
                        <div>
                            <button
                                onClick={() => setShowLogin(true)}
                                className='px-4 py-2 bg-red-600 text-white text-lg font-bold rounded-full! w-full'>Log In</button>
                        </div>
                        <div className='py-2'>Don't have an account? <Link to='/registration' target="_blank" rel="noopener noreferrer" className="text-black underline ml-2"
                            onClick={() => setShowSignin(true)}>
                            <strong>Sign Up</strong></Link></div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <section>
                        <div className='text-black font-bold text-2xl mb-4 px-4'>My details</div>
                        <Nav.Link className='py-2 px-4' href='/bookingpage' onClick={() => setOpenDrawer(false)}>
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-row items-center gap-4 text-lg font-semibold'>
                                    <i><TfiMenuAlt size={18} /></i>
                                    <span>Bookings</span>
                                </div>
                                <div>
                                    <i><IoIosArrowForward /></i>
                                </div>
                            </div>
                        </Nav.Link>
                        <Nav.Link className='py-2 border-y! border-gray-300! px-4' href='/personalinfo' onClick={() => setOpenDrawer(false)}>
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-row items-center gap-4 text-lg font-semibold'>
                                    <i><MdOutlinePersonOutline /></i>
                                    <span>Personal information</span>
                                </div>
                                <div>
                                    <i><IoIosArrowForward /></i>
                                </div>
                            </div>
                        </Nav.Link>
                    </section>
                </div>
            </RightDrawer>
            {/* {showSignin && (
                <Signinmodal
                    onClose={() => setShowSignin(false)}
                    openAccountDrawer={() => {
                        setShowSignin(false);
                        setOpenDrawer(true);
                    }}
                />
            )} */}
            {showLogin && (
                <Loginmodal
                    onClose={() => setShowLogin(false)}
                    openAccountDrawer={() => {
                        setShowLogin(false);
                        setOpenDrawer(true);
                    }}
                />
            )}
        </motion.div>
    )
}