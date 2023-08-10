import { useHistory } from "react-router-dom"
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { authenticate } from "../../store/session";
import "./Account.css"


function Account() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")

    const [profileImgUrl, setProfileImgUrl] = useState("")
    const [profileBio, setProfileBio] = useState("")

    const [password, setPassword] = useState("")

    useEffect(() => {
        dispatch(authenticate())

        if (user === null) return
        else {
            setEmail(user.email)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setUsername(user.username)
            
            setProfileBio(user.profileBio)
            setProfileImgUrl(user.profileImgUrl)
        }

    }, [dispatch])

    const handleLogout = (e) => {
        e.preventDefault();
        return dispatch(logout()).then(history.push("/"))
    };

    if(user === null) return null

    return (
        <div id="account-main-container">
            <div id="account-nav-buttons-container">
                <button>My Info</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>

            <form>
                <p className="center-p">Profile</p>
                <div className="profile-name-container">
                    <div>
                        <label>First Name</label>
                    <input
                        id="first_name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                    <input
                        id="last_name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="profile-name-container">
                    <div>
                        <label>Email</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Account
