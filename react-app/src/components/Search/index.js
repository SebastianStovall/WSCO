import { getAllStoreDataThunk } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PeopleSearch from "./PeopleSearch";
import ImageSearch from "./ImageSearch";
import JournalSearch from "./JournalSearch";
import "./Search.css"

function Search() {

    const dispatch = useDispatch()
    const allStoreData = useSelector((store) => store.store);
    const [view, setView] = useState("people");
    const [searchQueryString, setSearchQueryString] = useState("");

    useEffect(() => {
        if (!allStoreData.posts.length || !allStoreData.user.length || !allStoreData.comments.length || !allStoreData.journals.length) {
            async function fetchData() {
                await dispatch(getAllStoreDataThunk())
            }
            fetchData()
        }
    }, [dispatch, allStoreData]);


    const handleView = (view) => {
        setView(view);
    };

    if(!allStoreData.user.length || !allStoreData.posts.length) return null

    const searchQueryFunc = () => {

        // so if not search found, stop the loop for additional keystrokes

        const query = searchQueryString
        if(!query) return null


        if(view === "people") {
            const filteredUsers = allStoreData.user.filter(user => user.username.toLowerCase().startsWith(query.toLowerCase()))
            return filteredUsers
        }

        if(view === "images") {
            const filteredImages = allStoreData.posts.filter(img => img.caption.toLowerCase().includes(`#${query}`))
            return filteredImages
        }


    }


    return (
        <div id="search-component-main-container">
            <div id="search-bar-section">
                <div id="search-container">
                <input id="search_bar" type="text" placeholder="Search" onChange={(e) => setSearchQueryString(e.target.value)}/>
                </div>
                <div id="search-options-container">
                <button className={`search-button-view ${view === "people" ? 'active' : ''}`} onClick={() => handleView("people")}>People</button>
                <button className={`search-button-view ${view === "images" ? 'active' : ''}`} onClick={() => handleView("images")}>Images</button>
                <button className={`search-button-view ${view === "journals" ? 'active' : ''}`} onClick={() => handleView("journals")}>Journals</button>
                </div>
            </div>
            {view === "people" && <PeopleSearch searchResults={searchQueryFunc} />}
            {view === "images" && <ImageSearch searchResults={searchQueryFunc} />}
            {view === "journals" && <JournalSearch />}
        </div>
    )
}

export default Search
