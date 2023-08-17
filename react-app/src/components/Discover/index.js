import { getAllStoreDataThunk } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom"

function Discover() {

    const history = useHistory()
    const dispatch = useDispatch()
    const allStoreData = useSelector((store) => store.store);

    useEffect(() => {
        if (!allStoreData.posts.length || !allStoreData.user.length || !allStoreData.comments.length || !allStoreData.journals.length) {
            async function fetchData() {
                await dispatch(getAllStoreDataThunk())
            }
            fetchData()
        }
    }, [dispatch, allStoreData]);

    console.log("LOOK HERE DOG", allStoreData)

    return (
        <div className="grid-container-main">
            {allStoreData?.user?.map(profile => {
                return <div className="grid-element" onClick={() => history.push(`/${profile.username}/gallery`)}>
                    <div className="grid-profile-img-container">
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

export default Discover
