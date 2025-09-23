import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import busIcon from '../assets/bus-icon.svg';
import trainIcon from '../assets/train.svg';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Navbarcomponent() {
    const location = useLocation();
    const currentpath = location.pathname;
    console.log('currrentpath:', currentpath);
    return (
        <Navbar expand="lg" className="bg-white shadow-sm navbar-main">
            <Container fluid className="d-flex justify-content-between align-items-center navbar-container">

                <div className="d-flex align-items-center gap-4">

                    <Navbar.Brand href="#home">
                        <img src={busIcon} alt="bus-logo" height="35" />
                    </Navbar.Brand>


                    <Nav className="d-flex flex-row gap-4 align-items-center booking-links">
                        <Nav.Link as={NavLink} to='/bus'>
                            <div className={`navbar-active ${(currentpath === '/bus' || currentpath === '/') ? 'active' : ''}`} onClick={() => setactivetap('bus')}>
                                <img src={busIcon} alt="bus" />
                                <span>Bus Tickets</span>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={NavLink} to='/train'>
                            <div className={`navbar-active ${(currentpath === '/train' || currentpath === '/train')? 'active' : ''}`} onClick={() => setactivetap('train')}>
                                <img src={trainIcon} alt="train" />
                                <span>Train Tickets</span>
                            </div>
                        </Nav.Link>
                    </Nav>
                </div>


                <Nav className="d-flex flex-row gap-4 align-items-center right-menu">
                    <Nav.Link href="#bookings" className="d-flex align-items-center gap-1">
                        <TfiMenuAlt size={18} />
                        <span>Bookings</span>
                    </Nav.Link>
                    <Nav.Link href="#help" className="d-flex align-items-center gap-1">
                        <IoMdHelpCircleOutline size={20} />
                        <span>Help</span>
                    </Nav.Link>
                    <Nav.Link href="#account" className="d-flex align-items-center gap-1">
                        <MdOutlineAccountCircle size={20} />
                        <span>Account</span>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
