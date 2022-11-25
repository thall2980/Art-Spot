import React from 'react'
import { Link } from "react-router-dom";

const ArtistCard = ({artist}) => {
  return (
    <>
        <h1>{artist.username}</h1>
        <Link to={`/artists/${artist.id}`}>
        <img src={artist.profile_img} alt={artist.username} />
        </Link>
        <p>{artist.first_name} {artist.last_name}</p>
    </>
  )
}

export default ArtistCard