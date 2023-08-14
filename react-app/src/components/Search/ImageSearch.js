import { useHistory } from "react-router-dom";
import "./ImageSearch.css"

function ImageSearch({searchResults, store}) {

    const history = useHistory()
    const queryResult = searchResults ? searchResults() : [];

    if(!queryResult) return null

    for(let i = 0; i < queryResult.length; i++) {
        let ele = queryResult[i]

        const userInfoForImage = store.user.find((user) => user.id === ele.userId)
        ele.user = userInfoForImage
    }

    return (
        <div className="brick-layered-grid-main-container">
            {queryResult?.map(filteredPhotos => {
                return <div className="brick-grid-element" key={filteredPhotos.id} onClick={ () => history.push(`/${filteredPhotos.user.username}/gallery/${filteredPhotos.id}`)}>
                    <div className="grid-brick-img-container">
                        <img src={filteredPhotos.photoUrl} />
                    </div>
                </div>
            })}
        </div>
    )
}

export default ImageSearch
