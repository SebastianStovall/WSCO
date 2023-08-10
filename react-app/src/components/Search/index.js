import { getAllUsersThunk } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PeopleSearch from "./PeopleSearch";
import ImageSearch from "./ImageSearch";
import JournalSearch from "./JournalSearch";
import "./Search.css"

function Search() {

    const dispatch = useDispatch()
    const allUsersData = useSelector((store) => store.users);
    const [view, setView] = useState("people");
    const [searchQueryString, setSearchQueryString] = useState("");

    const UsersArray = Object.values(allUsersData)

    useEffect(() => {
        if (!Object.values(allUsersData).length) {
            async function fetchData() {
                await dispatch(getAllUsersThunk())
            }
            fetchData()
        }
    }, [dispatch, allUsersData]);

    const handleView = (view) => {
        setView(view);
    };

    const searchQueryFunc = () => {

        const query = searchQueryString
        if(!query) return null

        if(view === "people") {
            const filteredUsers = UsersArray.filter(user => user.username.toLowerCase().startsWith(query.toLowerCase()))
            return filteredUsers
        }

        if(view === "images") {
            const allImages = UsersArray.flatMap(user => user.posts)
            const filteredImages = allImages.filter(img => img.caption.toLowerCase().includes(`#${query}`))
            return filteredImages
        }

    }


    return (
        <div id="search-component-main-container">
            <div>
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
