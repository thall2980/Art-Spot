import React from 'react'
import ArtistCard from './ArtistCard'
import Container from "react-bootstrap/Container"

const ArtistContainer = ({artists, user}) => {
   const artistCard = artists.map((artist) => {
        return <ArtistCard key={artist.id} artist={artist} user={user} />
    })
  return (
    <div className="artist-container2">
    <Container className="artist-container">{artistCard}</Container></div>
  )
}

export default ArtistContainer