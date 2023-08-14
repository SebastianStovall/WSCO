import { useModal } from "../../context/Modal";
import { deleteJournalThunk } from "../../store/store";
import { useDispatch } from "react-redux";

function DeleteJournal({journalId}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    
    const handleDeleteJournal = async() => {
        await dispatch(deleteJournalThunk(journalId))
        closeModal()
    }

    return(
        <div id="delete-journal-modal">
            <h2>Are you sure you want to delete this journal?</h2>
            <h3>This action cannot be undone</h3>
            <div>
                <button onClick={handleDeleteJournal}>Yes (Delete)</button>
                <button onClick={closeModal}>No (Keep)</button>
            </div>
        </div>
    )
}

export default DeleteJournal
