import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Account from "./components/Account";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import Gallery from "./components/Gallery";
import PostDetails from "./components/PostDetails";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import CollectionPostDetails from "./components/Gallery/CollectionPostDetails";
import JournalDetails from "./components/JournalDetails";
import NewJournal from "./components/NewJournal";
import ImageSearchPostDetails from "./components/Search/ImageSearchPostDetails";
import Discover from "./components/Discover";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/discover">
            <Discover />
          </Route>
          <Route exact path="/:username/journals/new">
            <NewJournal />
          </Route>
          <Route exact path="/:username/image/:postId">
            <ImageSearchPostDetails />
          </Route>
          <Route exact path="/:username/gallery/:postId">
            <PostDetails />
          </Route>
          <Route exact path="/:username/collections/:postId">
            <CollectionPostDetails />
          </Route>
          <Route exact path="/:username/edit/:postId">
            <EditPost />
          </Route>
          <Route exact path="/:username/journals/:journalId">
            <JournalDetails />
          </Route>
          <Route exact path="/:username/gallery">
            <Gallery />
          </Route>
          <Route exact path="/:username/new">
            <NewPost />
          </Route>
          <Route exact path="*">
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
