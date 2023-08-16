import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";

function ProfileButton({ user }) {

  const dispatch = useDispatch()
  const history = useHistory()

  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target) || ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    return dispatch(logout()).then(history.push("/"))
};

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div id="profile-dropdown-main-container">
      <button onClick={openMenu} className="dropdown-button">
        <div className={!showMenu ? "" : " hidden"}>
            <div className="two-lines"></div>
            <div className="two-lines"></div>
        </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="buttons-in-scroll-popup">
            <p id="exit-scoll-popup">X</p>
            <button onClick={() => history.push("/account")}>Account</button>
            <button onClick={handleLogout}>Log out</button>
            {/* <button onClick={handleLogout}>Log Out</button> */}
          </div>
        ) : (
          <div className="buttons-in-scroll-popup">
            <p id="exit-scoll-popup">X</p>
            <button onClick={() => history.push("/login")}>Log In</button>
            <button onClick={() => history.push("/signup")}>Sign Up</button>
          </div>
        )}
      </ul>
      </button>
    </div>
  );
}

export default ProfileButton;
