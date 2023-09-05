# WSCO

WSCO is a photography app and social platform that offers users the ability to express and share their photography skills. It offers a sleek and minimalist interface, high-quality presets, and a community of photographers. WSCO enables users to edit and showcase their photos with a focus on artistic expression, allowing users to interact with the community

- Check out [WSCO](https://wsco.onrender.com/) here
- Connect With Me - [LinkedIn](https://www.linkedin.com/in/sebastian-stovall-a17a8a211/)

[MVP FEATURE LIST](https://github.com/SebastianStovall/WSCO/wiki/MVP-Features) | [Database Schema](https://github.com/SebastianStovall/WSCO/wiki/WSCO-Database-Schema) | [User Stories](https://github.com/SebastianStovall/WSCO/wiki/User-Stories-Documentation) | [Wire Frames](https://github.com/SebastianStovall/WSCO/wiki/WSCO-WireFrame)

## Technologies Used

### Backend

- Python
- Flask
- PostgresQL

### Frontend

- React
- Redux
- HTML
- CSS

## Splash Page

![WSCO Splash Page](https://sebastianstovallportfolio.netlify.app/images/wsco-thumbnail.png)

## User Gallery

![WSCO User Gallery](https://i.imgur.com/Y3IU5dA.png)

## Features

### Posts
 * Logged in AND logged out users can view a user's gallery/posts
 * Logged in users can create a new WSCO post
 * Logged in users can edit their WSCO posts
 * Logged in users can delete their WSCO posts

### Journals
 * Logged in AND logged out users can view a user's journals
 * Logged in users can create a new journal
 * Logged in users can edit their journals
 * Logged in users can delete their journals

### Comments
 * Logged in AND logged out users can view a WSCO post's comments
 * Logged in users can create a comment on a WSCO post
 * Logged in users can edit their comments on a post
 * Logged in users can delete their comments on a post

### Collections
 * Logged in and logged out users can view other user's collections
 * Logged in users can edit their collections


## Endpoints

|  Request                                      | Purpose                                           | Response
|  --------                                     | --------                                          | --------
|  GET /api/users                               | Returns the information for one user              | [ { <br> "collection": [{"caption": "#subtle scenery", "id": 12, "photoUrl": "https:fakelink.com",        "userId": 1} ], <br> "comments": [{ "comment": "yo hi there", "id": 17, "postId": 11, "userId": 1 }], <br> "email": "demolition@gmail.com", <br> "firstName": "john", <br> "id": 1, <br> "journals": [ {"description": "", "id": 1, "journalId": 1, "photoUrl": "https://fakelink.com"} ], <br> "posts": [ { "caption": "first light" "id": 1, "photoUrl": "https://fakelink.com", "userId": 1} ], <br> "profileImgBio": "hello world", <br> "profileImgUrl": "https://fakelink.com", <br> username: "demo-lition" <br> } ]

### Sessions
|  Request                                      | Purpose                                           | Response
|  -------------------------------------------  |  ------------------------------------------------ | ------------------------------------------------
|  GET /api/auth                                |  Returns the information for the logged in user   | { <br> "collection": [], <br> "comments": [], <br> "email": "demolition@gmail.com", <br> "firstName": "john", <br> "id": 1, <br> "journals": [], <br> "posts": [], <br> "profileImgBio": "hello world", <br> "profileImgUrl": "https://fakelink.com", <br> username: "demo-lition" <br> }
|  POST /api/auth/signup                        |  Signs a new user up                              | { <br> "collection": [], <br> "comments": [], <br> "email": "demolition@gmail.com", <br> "firstName": "john", <br> "id": 1, <br> "journals": [], <br> "posts": [], <br> "profileImgBio": "hello world", <br> "profileImgUrl": "https://fakelink.com", <br> username: "demo-lition" <br> }
|  POST /api/auth/login                         |   Logs in a user                                  | { <br> "collection": [], <br> "comments": [], <br> "email": "demolition@gmail.com", <br> "firstName": "john", <br> "id": 1, <br> "journals": [], <br> "posts": [], <br> "profileImgBio": "hello world", <br> "profileImgUrl": "https://fakelink.com", <br> username: "demo-lition" <br> }
|  DELETE /api/auth                             |   Logs out a user                                 | {'message': 'User logged out'}
### Posts
|  Request                                      | Purpose                                           | Response
|  -------------------------------------------  |  ------------------------------------------------ | ------------------------------------------------
|  GET /api/posts/                              | View all WSCO post                                | { <br> "collection": [], <br> "comments": [], <br> "email": "demolition@gmail.com", <br> "firstName": "john", <br> "id": 1, <br> "journals": [], <br> "posts": [], <br> "profileImgBio": "hello world", <br> "profileImgUrl": "https://fakelink.com", <br> username: "demo-lition" <br> }
|  POST /api/posts/new                          | Create new WSCO post                              | { <br> 'id': 5, <br> 'userId': 1, <br> 'photoUrl': "https://fakelink.com", <br> 'caption': "" <br> } |
|  PUT /api/posts/:postId                       | Edit a WSCO post                                  | { <br> 'id': 5, <br> 'userId': 1, <br> 'photoUrl': "https://fakelink.com", <br> 'caption': "hi" <br> } |
|  DELETE /api/posts/:postId                    | Delete a WSCO post                                | {"successfully deleted", 200}
### Journals
|  Request                                      | Purpose                                           | Response
|  -------------------------------------------  |  ------------------------------------------------ | ------------------------------------------------
|  GET /api/journals/journals                   |    View all of a user's journals                  | { <br> "collection": [], <br> "comments": [], <br> "email": "demolition@gmail.com", <br> "firstName": "john", <br> "id": 1, <br> "journals": [], <br> "posts": [], <br> "profileImgBio": "hello world", <br> "profileImgUrl": "https://fakelink.com", <br> username: "demo-lition" <br> }
|  POST /api/journals/new                       |   Create a new journal for a user                 | { <br> 'id': 5, <br> 'title': "test journal", <br> 'description': "", <br> 'userId': 1, <br> 'photos': [] <br> }
|  PUT /api/journals/:journalId                 |  Edit a user's journal                            | { <br> 'id': 5, <br> 'title': "test journal", <br> 'description': "", <br> 'userId': 1, <br> 'photos': [] <br> }
|  DELETE /api/journals/:journalId              |  Delete a user's journal                          | {"successfully deleted", 200}
### Collections
|  Request                                      | Purpose                                           | Response
|  -------------------------------------------  |  ------------------------------------------------ | ------------------------------------------------
|  POST /api/collections/add                    |  Adds a post to a user's collection page          | {"message": "Added to collection successfully"}, 200
|  DELETE /api/collections/:collectionId        |  Delete's a post to a user's collection page      | {"message": "Removed from collection successfully"}, 200


## Future Implementation Goals

- Users can view a Feed that shows randomized User's post
- Users can view a What's New page that shows WSCO's latest hot features
