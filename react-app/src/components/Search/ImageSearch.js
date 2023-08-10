import "./ImageSearch.css"

function ImageSearch({searchResults}) {

    const queryResult = searchResults ? searchResults() : [];
    console.log("RESULTS FOR IMAGES HOPEFULLY", queryResult);

    return (
        <div className="brick-layered-grid-main-container">
            {queryResult?.map(filteredPhotos => {
                return <div className="brick-grid-element">
                    <div className="grid-profile-img-container">
                        {/* <img src={profile.profileImgUrl} /> */}
                        <img src="https://im.vsco.co/1/537ecef40598a640901/55ada7de26331e79358b457a/88df590c-88aa-408b-81b8-f341dd357646.jpg?w=896.25&dpr=2" />
                    </div>
                    <div>
                        <p>{filteredPhotos.username}</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ImageSearch
