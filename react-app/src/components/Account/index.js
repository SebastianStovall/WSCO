import { useHistory } from "react-router-dom"
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import "./Account.css"

function Account() {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogout = (e) => {
    e.preventDefault();
    return dispatch(logout()).then(history.push("/"))
    };

    return (
        <div>
            <div id="account-nav-buttons-container">
                <button>My Info</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Account
