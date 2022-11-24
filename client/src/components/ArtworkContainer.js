import React from 'react'
import ArtworkCard from './ArtworkCard'

const ArtworkContainer = ({artwork, user, handleArtworkLike, handleArtworkUnlike}) => {
    const artworkCard = artwork.map((artwork) => {
        return <ArtworkCard key={artwork.id} artwork={artwork} user={user} handleArtworkLike={handleArtworkLike} handleArtworkUnlike={handleArtworkUnlike} />
    })
  return (
    <div>{artworkCard}</div>
  )
}

export default ArtworkContainer