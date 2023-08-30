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

|  Request                                      | Purpose                                           |
|  --------                                     | --------                                          |
|  GET /api/users                               | Returns the information for one user              |
|  GET /api/users/:id                           |  Returns the information for all users            |
### Sessions
|  Request                                      | Purpose                                           |
|  -------------------------------------------  |  ------------------------------------------------ |
|  GET /api/auth                                |  Returns the information for the logged in user   |
|  POST /api/auth/signup                        |  Signs a new user up                              |
|  POST /api/auth/login                         |   Logs in a user                                  |
|  DELETE /api/auth                             |   Logs out a user                                 |
### Posts
|  Request                                      | Purpose                                           |
|  -------------------------------------------  |  ------------------------------------------------ |
|  GET /api/:username/gallery                   |  View all WSCO post                               |
|  POST /api/:username/gallery                  | Create new WSCO post                              |
|  PUT /api/:username/gallery/:postId           | Edit a WSCO post                                  |
|  DELETE /api/:username/gallery/:postId        | Delete a WSCO post                                |
### Journals
|  Request                                      | Purpose                                           |
|  -------------------------------------------  |  ------------------------------------------------ |
|  GET /api/:username/journals                  |    View all of a user's journals                  |
|  POST /api/:username/journals                 |   Create a new journal for a user                 |
|  PUT /api/:username/journals/:journalTitle    |  Edit a user's journal                            |
|  DELETE /api/:username/journals/:journalTitle |  Delete a user's journal                          |
### Collections
|  Request                                      | Purpose                                           |
|  -------------------------------------------  |  ------------------------------------------------ |
|  POST /api/collections/add                    |  Adds a post to a user's collection page          |
|  DELETE /api/collections/:collectionId        |  Delete's a post to a user's collection page      |


## Future Implementation Goals

- Users can view a Feed that shows randomized User's post
- Users can view a What's New page that shows WSCO's latest hot features
