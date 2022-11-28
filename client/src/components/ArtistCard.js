import React from 'react'
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const ArtistCard = ({artist}) => {
  return (
    <Card className="artwork-card">
        <h1 className="artistTitle">{artist.username}</h1>
        <Link to={`/artists/${artist.id}`}>
        <Card.Img src={artist.profile_img} alt={artist.username} className="artwork-card-img" />
        </Link>
        <h4 className="artistName">{artist.first_name} {artist.last_name}</h4>
    </Card>
  )
}

export default ArtistCard