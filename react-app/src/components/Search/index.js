import "./Search.css"

function Search() {
    return (
        <div id="search-component-main-container">
            <div>
                <div id="search-container">
                <input id="search_bar" type="text" placeholder="Search"/>
                </div>
                <div id="search-options-container">
                    <p>People</p>
                    <p>Images</p>
                    <p>Journal</p>
                </div>
            </div>
        </div>
    )
}

export default Search
