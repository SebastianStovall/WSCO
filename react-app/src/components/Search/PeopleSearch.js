import { useHistory } from "react-router-dom"
import "./PeopleSearch.css"



function PeopleSearch({searchResults}) {

    const queryResult = searchResults ? searchResults() : [];
    const history = useHistory()

    return (
        <div className="grid-container-main">
            {queryResult?.map(profile => {
                return <div className="grid-element" onClick={() => history.push(`/${profile.username}/gallery`)}>
                    <div className="grid-profile-img-container">
                        {/* <img src={profile.profileImgUrl} /> */}
                        <img src="https://im.vsco.co/1/537ecef40598a640901/55ada7de26331e79358b457a/88df590c-88aa-408b-81b8-f341dd357646.jpg?w=896.25&dpr=2" />
                    </div>
                    <div>
                        <p>{profile.username}</p>
                        { profile.firstName && profile.lastName ? <p>{profile.firstName} {profile.lastName}</p> : ""}
                    </div>
                </div>
            })}
        </div>
    )
}

export default PeopleSearch
