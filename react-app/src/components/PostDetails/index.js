// import { getAllUsersThunk } from "../../store/store";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { deletePostThunk } from "../../store/user";

// function PostDetails() {

//     const { postId } = useParams()
//     const dispatch = useDispatch()

//     const user = useSelector((store) => store.session.user)
//     const allUsersData = useSelector((store) => store.users);
//     const UsersArray = Object.values(allUsersData)

//     useEffect(() => {
//         if (!Object.values(allUsersData).length) {
//             async function fetchData() {
//                 await dispatch(getAllUsersThunk())
//             }
//             fetchData()
//         }
//     }, [dispatch, allUsersData]);

//     const handleDeletePost = async () => {
//         const response = await dispatch(deletePostThunk(postId, user.id))
//         console.log("RESPONSE", response)
//     }

//     const allImages = UsersArray.flatMap(user => user.posts)
//     const postDetails = allImages.filter(img => img.id === Number(postId))[0]

//     return (
//         <>
//             <h4>hello</h4>
//             <button onClick={handleDeletePost}>Delete Post</button>
//         </>
//     )

// }

// export default PostDetails
