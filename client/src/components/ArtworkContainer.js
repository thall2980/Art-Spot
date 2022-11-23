import React from 'react'
import ArtworkCard from './ArtworkCard'

const ArtworkContainer = ({artwork}) => {
    const artworkCard = artwork.map((artwork) => {
        return <ArtworkCard key={artwork.id} artwork={artwork} />
    })
  return (
    <div>{artworkCard}</div>
  )
}

export default ArtworkContainer