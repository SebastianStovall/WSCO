function PeopleSearch({searchResults}) {

    const queryResult = searchResults ? searchResults() : [];
    console.log("RESULTS FOR PEOPLE HOPEFULLY", queryResult);

    return (
        <div>
            <h4>PEOPLE RENDER HERE</h4>
        </div>
    )
}

export default PeopleSearch
