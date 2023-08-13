import "./Collection.css"
import { useHistory } from "react-router-dom"

function Collection({store, currUser}) {

    const history = useHistory()

    // find the user we are currently looking at
    const userIndex = store.user.findIndex(user => user.username === currUser.username)
    // get access to their liked posts
    const userCollectionArray = store.user[userIndex].collection

    // get the liked posts Id's to map through
    const likedPostIds = userCollectionArray.map((post) => {
        return Number(post.id)
    })

    // map through the liked posts Id's and then loop through posts to filter ones that match the id's. this gives access to all of the user's liked posts info
    const likedPosts = []
    likedPostIds.forEach((x, index) => {
        const likedPost = store.posts.find((post) => post.id === likedPostIds[index])
        likedPosts.push(likedPost)
    })

    // attach the user's information to the liked posts so we can click and navigate to their page
    for (let index = 0; index < likedPosts.length; index++) {
        const ele = likedPosts[index]
        const user = store.user.find((user) => user.id === ele.userId)
        ele.user = user
    }

    const generateRandomHeight = () => {
        const randomHeight = [190, 250, 340][Math.floor(Math.random() * 3)];
        return randomHeight
    }

    return (
        <div className="grid-collection-container-main">
            {likedPosts?.map(post => {
                return <div className="grid-element-collection" onClick={() => history.push(`/${post.user.username}/gallery/${post.id}`)}>
                    <div className="grid-collection-img-container">
                        <img src={post.photoUrl} height={generateRandomHeight()} alt="collection-img-post" />
                    </div>
                        <p>{post.user.username}</p>
                </div>
            })}
        </div>
    )
}

export default Collection
