import React from 'react';
import {
    FaAngleRight,
    FaAngleLeft,
    FaChartBar,
    FaThLarge,
    FaSignOutAlt,
    FaBars,
    FaAccessibleIcon
} from 'react-icons/fa';
import { Link } from "react-router-dom";
import "../style/navbar.css";

const ICON_SIZE = 20;

function Navbar({ visible, show }) {
    return (
        <>
            <div className="mobile-nav">
                <button
                    className="mobile-nav-btn"
                    onClick={() => show(!visible)}
                >
                    <FaBars size={24} />
                </button>
            </div>
            <nav className={!visible ? 'navbar' : ''}>
                <button
                    type="button"
                    className="nav-btn"
                    onClick={() => show(!visible)}
                >
                    {!visible ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
                </button>
                <div>
                    <Link
                        className="logo"
                        to="/"
                    >
                        <img
                            src={require("../assets/Images/side.png")}
                            alt="logo"
                        />
                    </Link>
                    <div className="links nav-top">
                        <Link to="/" className="nav-link">
                            <FaThLarge size={ICON_SIZE} />
                            <span>Legal drafting</span>
                        </Link>
                        <Link to="/E-court" className="nav-link">
                            <FaChartBar size={ICON_SIZE} />
                            <span>E-court</span>
                        </Link>
                        <Link to="/Legal-QA" className="nav-link">
                            <FaAccessibleIcon size={ICON_SIZE} />
                            <span>Legal Q/A</span>
                        </Link>
                    </div>
                </div>

                <div className="links">
                    <Link to="/Sign-out" className="nav-link">
                        <FaSignOutAlt size={ICON_SIZE} />
                        <span>Logout</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
