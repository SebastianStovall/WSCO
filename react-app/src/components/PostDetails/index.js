import { getAllUsersThunk } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function PostDetails() {

    const { postId } = useParams()
    const dispatch = useDispatch()

    const allUsersData = useSelector((store) => store.users);
    const UsersArray = Object.values(allUsersData)

    useEffect(() => {
        if (!Object.values(allUsersData).length) {
            async function fetchData() {
                await dispatch(getAllUsersThunk())
            }
            fetchData()
        }
    }, [dispatch, allUsersData]);

    const allImages = UsersArray.flatMap(user => user.posts)
    const postDetails = allImages.filter(img => img.id === Number(postId))[0]

    return (
        <h4>hello</h4>
    )

}

export default PostDetails
