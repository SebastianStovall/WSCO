import { useHistory } from "react-router-dom"

function PageNotFound() {

    const history = useHistory()

    return (
        <div id="login-redirect-page-container">
            <h2>Hmm...</h2>
            <h3>seems like the page your trying to access doesnt exist. lets fix that</h3>
            <button onClick={() => history.push("/")}>Go To Home</button>
        </div>
    )
}

export default PageNotFound
