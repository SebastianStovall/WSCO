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
                        {profile.profileImgUrl ? <img src={profile.profileImgUrl} /> : <img src="https://instasize.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fmunkee%2Fimage%2Fupload%2Fv1675319854%2Finstasize-website%2Flearn%2Fvsco-logo.webp&w=3840&q=75" />}
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
