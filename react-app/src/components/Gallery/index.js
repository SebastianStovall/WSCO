import { getAllUsersThunk } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Gallery.css"

function Gallery() {

    const dispatch = useDispatch()
    const history = useHistory()
    const allUsersData = useSelector((store) => store.users);
    const {username} = useParams()

    const UsersArray = Object.values(allUsersData)

    useEffect(() => {
        if (!Object.values(allUsersData).length) {
            async function fetchData() {
                await dispatch(getAllUsersThunk())
            }
            fetchData()
        }
    }, [dispatch, allUsersData]);

    const user = UsersArray.filter((user) => user.username === username)[0]
    // console.log("USER", user)

    return (
        <div id="gallery-main-component-container">
            <div id="gallery-profile-container">
                {user?.profileImgUrl ? <img src={user?.profileImgUrl} />
                : <img src="https://rassets.vsco.co/avatars/avatar-other.png?c=1&d=1&w=300" /> }
                <div>
                    <p>{user?.username}</p>
                    <p className="profile-bio-text">{user?.profileBio}</p>
                </div>
            </div>
            <div className="brick-layered-grid-main-container">
                {user?.posts.map(filteredPhotos => {
                    return <div className="brick-grid-element">
                        <div className="grid-brick-img-container">
                            <img src={filteredPhotos.photoUrl} onClick={() => history.push(`/${user.username}/gallery/${filteredPhotos.id}`)} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Gallery
