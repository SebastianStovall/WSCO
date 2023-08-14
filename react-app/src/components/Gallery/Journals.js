import { useHistory } from "react-router-dom";
import "./Journals.css"

function Journals({store, currUser}) {

    const history = useHistory()
    const allUserJournals = store.journals.filter((journal) => journal.userId === currUser.id)

    return (
        <div id="journal-component-main-container">
            <div id="journal-cover-grid-container">
                {allUserJournals.map((journal) => {
                    return <div key={journal.id} id="journal-cover-grid-component" onClick={() => history.push(`/${currUser.username}/journals/${journal.id}`)}>
                        <img src={journal.photos[0].photoUrl} width={620} height={414.36} />
                        <div id="journal-cover-desc-text">
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
