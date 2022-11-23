import React from 'react'
import ArtistCard from './ArtistCard'

const ArtistContainer = ({artists, user}) => {
   const artistCard = artists.map((artist) => {
        return <ArtistCard key={artist.id} artist={artist} user={user} />
    })
  return (
    <div>{artistCard}</div>
  )
}

export default ArtistContainer