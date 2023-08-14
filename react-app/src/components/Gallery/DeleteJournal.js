import { useModal } from "../../context/Modal";

function DeleteJournal({journalId}) {

    const { closeModal } = useModal()
    const handleDeleteJournal = async() => {
        console.log("OMG YOU DELTED IT SADOHUIASIUDH")
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
