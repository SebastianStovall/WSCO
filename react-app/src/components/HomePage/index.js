import { getAllUsersThunk } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// await dispatch(getAllUsersThunk())

function HomePage() {

    const dispatch = useDispatch()
    const allUsersData = useSelector((store) => store.users);

    useEffect(() => {
        if (!Object.values(allUsersData).length) {
            async function fetchData() {
                await dispatch(getAllUsersThunk())
            }
            fetchData()
        }
    }, [dispatch, allUsersData]);

    return (
        <div>
            <h4>home</h4>
        </div>
    )

}

export default HomePage
