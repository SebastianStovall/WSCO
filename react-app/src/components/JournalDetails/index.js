import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStoreDataThunk } from "../../store/store";
import { NavLink } from "react-router-dom";
import "./JournalDetails.css"

function JournalDetails() {

    const dispatch = useDispatch()
    const allStoreData = useSelector((store) => store.store);
    const {username, journalId} = useParams()

    useEffect(() => {
        if (!allStoreData.posts.length || !allStoreData.user.length || !allStoreData.comments.length || !allStoreData.journals.length) {
            async function fetchData() {
                await dispatch(getAllStoreDataThunk())
            }
            fetchData()
        }
    }, [dispatch, allStoreData]);

    if(!allStoreData.user.length || !allStoreData.journals.length) return null

    // Find the journal we are looking at
    const journal = allStoreData.journals.filter((journal) => journal.id === Number(journalId))[0]

    // Access the journal's photos
    const journalPhotos = journal.photos
    console.log("THESE ARE THE JOURNAL PHOTOS --------> ", journalPhotos)

    return(
        <div id="journal-details-main-component">
            <div>
                <h2 id="journal-details-title-text">{journal.title}</h2>
                <h3 id="journal-details-title-description">{journal.description}</h3>
            </div>
            {journalPhotos.map((photo) => {
                return <div id={photo.id} className="single-journal-photo-container">
                    <img src={photo.photoUrl} />
                </div>
            })}
            <NavLink exact to={`/${username}/gallery`}>Back To — {username}</NavLink>
        </div>
    )
}

export default JournalDetails
