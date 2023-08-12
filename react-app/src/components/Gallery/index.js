import { getAllStoreDataThunk } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Journals from "./Journals";
import Collection from "./Collection";
import "./Gallery.css"

function Gallery() {

    const dispatch = useDispatch()
    const history = useHistory()
    const allStoreData = useSelector((store) => store.store);
    const loggedInUser = useSelector((store) => store.session.user)
    const {username} = useParams()

    const [view, setView] = useState("gallery");

    useEffect(() => {
        if (!allStoreData.posts.length || !allStoreData.user.length || !allStoreData.comments.length || !allStoreData.journals.length) {
            async function fetchData() {
                await dispatch(getAllStoreDataThunk())
            }
            fetchData()
        }
    }, [dispatch, allStoreData]);

    const handleView = (view) => {
        setView(view);
    };

    if(!allStoreData.user.length) return null

    const user = allStoreData.user.filter((user) => user.username === username)[0]
    const userPosts = allStoreData.posts.filter((post) => post.userId === user.id)

    return (
        <div id="gallery-main-component-container">
            <div id="gallery-profile-container">
                {user?.profileImgUrl ? <img src={user?.profileImgUrl} />
                : <img src="https://rassets.vsco.co/avatars/avatar-other.png?c=1&d=1&w=300" /> }
                <div>
                    <p>{user?.username}</p>
                    <p className="profile-bio-text">{user?.profileBio}</p>
                    {user?.id === loggedInUser?.id ?
                    <button id="create-post-gallery-button" onClick={() => history.push(`/${user?.username}/new`)}>New Post</button> : ""}
                </div>
                <div id="gallery-options-container">
                    <button className={`gallery-button-view ${view === "gallery" ? 'active' : ''}`} onClick={() => handleView("gallery")}>Gallery</button>
                    <button className={`gallery-button-view ${view === "journals" ? 'active' : ''}`} onClick={() => handleView("journals")}>Journals</button>
                    <button className={`gallery-button-view ${view === "collection" ? 'active' : ''}`} onClick={() => handleView("collection")}>Collection</button>
                </div>
            </div>
            {view === "gallery" && <div className="brick-layered-grid-main-container">
                {userPosts?.map(filteredPhotos => {
                    return <div className="brick-grid-element">
                        <div className="grid-brick-img-container">
                            <img src={filteredPhotos.photoUrl} onClick={() => history.push(`/${user?.username}/gallery/${filteredPhotos.id}`)} />
                        </div>
                    </div>
                })}
            </div>}
            {view === "journals" && <Journals />}
            {view === "collection" && <Collection />}
        </div>
    )
}

export default Gallery
