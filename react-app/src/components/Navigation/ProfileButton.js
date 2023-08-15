import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {

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
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   dispatch(logout());
  // };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div id="profile-dropdown-main-container">
      <button onClick={openMenu} className="dropdown-button">
        <div>
            <div className="two-lines"></div>
            <div className="two-lines"></div>
        </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <button onClick={() => history.push("/account")}>Account</button>
            {/* <button onClick={handleLogout}>Log Out</button> */}
          </>
        ) : (
          <></>
          // <>
          //   <OpenModalButton
          //     buttonText="Log In"
          //     onItemClick={closeMenu}
          //     modalComponent={<LoginFormModal />}
          //   />

          //   <OpenModalButton
          //     buttonText="Sign Up"
          //     onItemClick={closeMenu}
          //     modalComponent={<SignupFormModal />}
          //   />
          // </>
        )}
      </ul>
      </button>
    </div>
  );
}

export default ProfileButton;
