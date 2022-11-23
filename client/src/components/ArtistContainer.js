import React from 'react'
import ArtistCard from './ArtistCard'

const ArtistContainer = ({artists}) => {
   const artistCard = artists.map((artist) => {
        return <ArtistCard key={artist.id} artist={artist} />
    })
  return (
    <div>{artistCard}</div>
  )
}

export default ArtistContainer