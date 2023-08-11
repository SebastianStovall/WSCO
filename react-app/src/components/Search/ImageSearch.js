import "./ImageSearch.css"

function ImageSearch({searchResults}) {

    const queryResult = searchResults ? searchResults() : [];
    console.log("RESULTS FOR IMAGES HOPEFULLY", queryResult);

    return (
        <div className="brick-layered-grid-main-container">
            {queryResult?.map(filteredPhotos => {
                return <div className="brick-grid-element">
                    <div className="grid-brick-img-container">
                        <img src={filteredPhotos.photoUrl} />
                    </div>
                </div>
            })}
        </div>
    )
}

export default ImageSearch
