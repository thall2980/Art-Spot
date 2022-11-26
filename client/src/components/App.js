import "../App.css";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import ArtistContainer from "./ArtistContainer";
import ArtworkContainer from "./ArtworkContainer";
import ArtworkWithComments from "./ArtworkWithComments";
import ArtistProfile from "./ArtistProfile";

function App() {
  const [artwork, setArtwork] = useState([]);
  const [artists, setArtists] = useState([]);
  const [user, setUser] = useState("");
  const [comments, setComments] = useState([]);
  const [follows, setFollows] = useState([]);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch("/artworks")
      .then((res) => res.json())
      .then(setArtwork);
  }, []);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then(setArtists);
  }, []);

  useEffect(() => {
    fetch("/comments")
      .then((res) => res.json())
      .then(setComments);
  }, []);

  useEffect(() => {
    fetch("/follows")
      .then((res) => res.json())
      .then(setFollows);
  }, []);

  useEffect(() => {
    fetch(`/auth`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data);
        });
      } else {
        res.json().then((data) => setErrors(data.error));
      }
    });
  }, []);

  function handleLogin(addUser) {
    setUser(addUser);
  }

  function handleUpdateUser(update) {
    setUser(update)
  }

  function logOut() {
    fetch("/logout", {
      method: "DELETE",
    });
    history.push(`/`);
    setUser("");
  }

  function handleAddUser(newUser) {
    setArtists([...artists, newUser]);
  }

  function handleAddComment(newComment) {
    setComments([...comments, newComment]);
  }
  function onDeleteComment(id) {
    setComments((comments) => comments.filter((comment) => comment.id !== id));
  }

  function handleUpdateComment(updatedComment) {
    setComments((comment) => {
      return comments.map((c) => {
        return c.id === updatedComment.id ? updatedComment : c;
      });
    });
  }

  function handleArtworkUnlike(newLike) {
    const addLikeArt = artwork.find((e) => e.id === newLike);
    const newAddLikeArt = { ...addLikeArt, likes: (addLikeArt.likes -= 1) };

    fetch(`/artworks/${newLike}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newAddLikeArt.likes }),
    })
      .then((r) => r.json())
      .then((updatedArt) => {
        setArtwork((artwork) => {
          return artwork.map((a) => {
            return a.id === updatedArt.id ? updatedArt : a;
          });
        });
      });
  }

  function handleArtworkLike(newLike) {
    const addLikeArt = artwork.find((e) => e.id === newLike);
    const newAddLikeArt = { ...addLikeArt, likes: (addLikeArt.likes += 1) };

    fetch(`/artworks/${newLike}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newAddLikeArt.likes }),
    })
      .then((r) => r.json())
      .then((updatedArt) => {
        setArtwork((artwork) => {
          return artwork.map((a) => {
            return a.id === updatedArt.id ? updatedArt : a;
          });
        });
      });
  }

  function handleCommentLike(newLikeID) {
    const addLikeComment = comments.find((e) => e.id === newLikeID);
    const newAddLikeComment = {
      ...addLikeComment,
      likes: (addLikeComment.likes += 1),
    };

    fetch(`/comments/${newLikeID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newAddLikeComment.likes }),
    })
      .then((r) => r.json())
      .then((updatedComment) => {
        setComments((comment) => {
          return comment.map((c) => {
            return c.id === updatedComment.id ? updatedComment : c;
          });
        });
      });
  }

  function handleCommentUnlike(newUnlikeID) {
    const addUnlikeComment = comments.find((e) => e.id === newUnlikeID);
    const newAddUnlikeComment = {
      ...addUnlikeComment,
      likes: (addUnlikeComment.likes -= 1),
    };

    fetch(`/comments/${newUnlikeID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newAddUnlikeComment.likes }),
    })
      .then((r) => r.json())
      .then((updatedComment) => {
        setComments((comment) => {
          return comment.map((c) => {
            return c.id === updatedComment.id ? updatedComment : c;
          });
        });
      });
  }

  function handleFollow(newFollow) {
    setFollows([...follows, newFollow]);
  }

  function handleUnfollow(id) {
    setFollows((follows) => follows.filter((follow) => follow.id !== id));
  }

  function handleAddArt(newArt) {
    setArtwork([...artwork, newArt]);
  }

  function handleDeleteArt(id) {
    setArtwork((artwork) => artwork.filter((art) => art.id !== id));
  }

  return (
    <>
      <header>
        <NavBar user={user} />
        <div className="logout">
          {user ? user.first_name : null}{" "}
          {user ? (
            <button className="button-54" onClick={logOut}>
              Log Out
            </button>
          ) : null}
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile
              user={user}
              artwork={artwork}
              follows={follows}
              setUser={setUser}
              handleAddArt={handleAddArt}
              handleDeleteArt={handleDeleteArt}
              handleUpdateUser={handleUpdateUser}
            />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Signup handleLogin={handleLogin} handleAddUser={handleAddUser} />
          </Route>
          <Route exact path="/artists">
            <ArtistContainer artists={artists} />
          </Route>
          <Route exact path="/artwork">
            <ArtworkContainer
              artwork={artwork}
              user={user}
              handleArtworkLike={handleArtworkLike}
              handleArtworkUnlike={handleArtworkUnlike}
            />
          </Route>
          <Route path="/artwork/:id">
            <ArtworkWithComments
              artwork={artwork}
              user={user}
              comments={comments}
              handleArtworkLike={handleArtworkLike}
              handleArtworkUnlike={handleArtworkUnlike}
              handleAddComment={handleAddComment}
              onDeleteComment={onDeleteComment}
              handleUpdateComment={handleUpdateComment}
              handleCommentLike={handleCommentLike}
              handleCommentUnlike={handleCommentUnlike}
            />
          </Route>
          <Route path="/artists/:id">
            <ArtistProfile
              artists={artists}
              user={user}
              follows={follows}
              handleFollow={handleFollow}
              handleUnfollow={handleUnfollow}
            />
          </Route>
        </Switch>
      </header>
    </>
  );
}

export default App;
