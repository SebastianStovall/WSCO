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
    }, []);

    return (
        <div className="grid-container-main">
            {allStoreData?.user?.map(profile => {
                return <div className="grid-element" onClick={() => history.push(`/${profile.username}/gallery`)}>
                    <div className="grid-profile-img-container">
                        {profile.profileImgUrl ? <img src={profile.profileImgUrl} /> : <img src="https://rassets.vsco.co/avatars/avatar-other.png?c=1&d=1&w=300" />}
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
