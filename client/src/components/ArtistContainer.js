import React from 'react'
import ArtistCard from './ArtistCard'
import Container from "react-bootstrap/Container"

const ArtistContainer = ({artists, user}) => {
   const artistCard = artists.map((artist) => {
        return <ArtistCard key={artist.id} artist={artist} user={user} />
    })
  return (
    <Container className="artist-container">{artistCard}</Container>
  )
}

export default ArtistContainer