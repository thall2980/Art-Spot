import React from 'react'
import ArtworkCard from './ArtworkCard'

const ArtworkContainer = ({artwork, user}) => {
    const artworkCard = artwork.map((artwork) => {
        return <ArtworkCard key={artwork.id} artwork={artwork} user={user} />
    })
  return (
    <div>{artworkCard}</div>
  )
}

export default ArtworkContainer