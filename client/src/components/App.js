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

function App() {
  const [artwork, setArtwork] = useState([]);
  const [artists, setArtists] = useState([]);
  const [user, setUser] = useState("");
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
    fetch(`/auth`).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        });
      } else {
        res.json().then((data) => setErrors(data.error));
      }
    });
  }, []);

  function handleLogin(addUser) {
    setUser(addUser);
  }

  function logOut() {
    fetch("/logout", {
      method: "DELETE",
    });
    history.push(`/`);
    setUser("");
  }

  return (
    <>
      <header>
        <NavBar />
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
            <Profile user={user}/>
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Signup handleLogin={handleLogin} />
          </Route>
          <Route path="/artists">
            <ArtistContainer artists={artists} />
          </Route>
          <Route path="/artwork">
            <ArtworkContainer artwork={artwork}/>
          </Route>
        </Switch>
      </header>
    </>
  );
}

export default App;
