import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Journals.css"
import OpenModalButton from "../OpenModalButton";
import DeleteJournal from "./DeleteJournal";

function Journals({store, currUser}) {

    // this might cause an issue since we arent using a dispatch, so when it goes back to read it might get
    // undefined reading user id
    const user = useSelector((state) => state.session.user)
    const history = useHistory()
    const allUserJournals = store.journals.filter((journal) => journal.userId === currUser.id)

    return (
        <div id="journal-component-main-container">
            <div id={allUserJournals.length === 1 ? "journal-cover-grid-container-single" : "journal-cover-grid-container"}>
                {allUserJournals.map((journal) => {
                    return <div key={journal.id} id="journal-cover-grid-component">
                        <img src={journal.photos[0].photoUrl} width={620} height={414.36} onClick={() => history.push(`/${currUser.username}/journals/${journal.id}`)}/>
                        <div id="journal-cover-desc-text">
                        {currUser?.id === user?.id ? <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteJournal journalId={journal.id}/>} /> : ""}
                            <h3>{journal.title}</h3>
                            <p>{journal.description}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Journals
