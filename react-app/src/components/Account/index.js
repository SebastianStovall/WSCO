import { useHistory } from "react-router-dom"
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateUser } from "../../store/session";
import { updateUserPassword } from "../../store/session";
import "./Account.css"
import { getAllStoreDataThunk } from "../../store/store";


function Account() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState(null);
    const [profileBio, setProfileBio] = useState("")
    const [changeProfilePic, setChangeProfilePic] = useState(false)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {

        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setUsername(user.username);
        setProfileBio(user.profileBio);

    }, [dispatch, user])

    const handleLogout = (e) => {
        e.preventDefault();
        return dispatch(logout()).then(history.push("/"))
    };

    const handleUpdateInfo = async (e) => {
        e.preventDefault();

        const errors = {}

        if(changeProfilePic) {

            if(image === null) {
                errors.file = "please select a profile image"
                setFormErrors(errors)
                return
            }

            let fileExtCheck = true;
            if(!image.name.endsWith("jpeg") && !image.name.endsWith("jpg") && !image.name.endsWith("png")) fileExtCheck = false
            if(!fileExtCheck) {
                errors.file = 'Photos must end in either "jpg", "jpeg", or "png" '
            }
            if(Object.keys(errors).length > 0) {
                setFormErrors(errors)
                return
            }
        }

        const formData = new FormData();

        if(changeProfilePic) {
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("username", username);
            formData.append("profileImgUrl", image);
            formData.append("profileBio", profileBio);
        } else {
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("username", username);
            formData.append("profileBio", profileBio);
        }

        const response = await dispatch(updateUser(formData))

        if (response.errors) {
            const errors = response.errors // main backend errors
            setFormErrors(errors)
        } else {
            await dispatch(getAllStoreDataThunk())
            history.push(`/`)
        }

    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault()

        if(confirmPassword !== password) {
            const errors = {"confirmPassword": "Password Fields Mismatched"}
            setFormErrors(errors)
            return
        } else {

            const passwordInfo = {
                password: password
            }
            const response = await dispatch(updateUserPassword(passwordInfo))
            if (response.errors) {
                const errors = response.errors // main backend errors
                setFormErrors(errors)
            } else {
                history.push(`/`)
            }
        }
    }


    return (
        <div id="account-main-container">
            <div id="account-nav-buttons-container">
                <button>My Info</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>

            <form encType="multipart/form-data" onSubmit={handleUpdateInfo}>
                {/* <p className="center-p">Profile</p> */}
                <div className="profle-form-section-container">
                    <div>
                        <label>First Name</label>
                        {formErrors.firstName && formErrors.firstName.map((error, idx) => <span key={idx} className="errors">{error}</span> )}
                    <input
                        id="first_name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        {formErrors.lastName && formErrors.lastName.map((error, idx) => <span key={idx} className="errors">{error}</span> )}
                    <input
                        id="last_name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="profle-form-section-container">
                    <div>
                        <label>Email</label>
                        {formErrors.email && formErrors.email.map((error, idx) => <span key={idx} className="errors">{error}</span> )}
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Username</label>
                        {formErrors.username && formErrors.username.map((error, idx) => <span key={idx} className="errors">{error}</span> )}
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div className="profle-form-section-container">
                    <div>
                        <label>Bio</label>
                        {formErrors.profileBio && formErrors.profileBio.map((error, idx) => <span key={idx} className="errors">{error}</span> )}
                    <input
                        id="email"
                        type="text"
                        value={profileBio}
                        onChange={(e) => setProfileBio(e.target.value)}
                        />
                    </div>
                        <button type="button" onClick={() => setChangeProfilePic(true)} className={changeProfilePic ? "change-profile-pic-button-hidden" : "change-profile-pic-button"}>Change Picture</button>
                    {changeProfilePic ? (<div>
                        <label>Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}
                        />
                    {formErrors.file && <span className="errors">{formErrors.file}</span>}
                    </div> ) : null}
                </div>
                <button type="submit" className="account-details-form-button">Save Changes</button>
            </form>

            <form id="password-edit-form">
                <div className="profle-form-section-container password">
                    <div>
                        <label>New Password</label>
                        {formErrors.password && <span className="errors">{formErrors.password[0]}</span>}
                        <input
                            id="new_password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        {formErrors.confirmPassword && <span className="errors">{formErrors.confirmPassword}</span>}
                        <input
                            id="confirm_password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="submit" className="account-details-form-button password-button" onClick={handleUpdatePassword}>Save Changes</button>
                    </div>
                </div>
                <div id="profile-img-container">
                    {user?.profileImgUrl ? <img src={user?.profileImgUrl} alt="profile-img" /> : <img src="https://rassets.vsco.co/avatars/avatar-other.png?c=1&d=1&w=300" />}
                    <p>Current Profile Picture</p>
                </div>
            </form>
        </div>
    )
}

export default Account
