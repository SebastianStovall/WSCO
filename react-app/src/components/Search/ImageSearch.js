function ImageSearch({searchResults}) {

    const queryResult = searchResults ? searchResults() : [];
    console.log("RESULTS FOR IMAGES HOPEFULLY", queryResult);

    return (
        <div>
            <h4>IMAGE SEARCH HERE</h4>
        </div>
    )
}

export default ImageSearch
