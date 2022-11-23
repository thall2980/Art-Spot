import React from 'react'

const ArtistCard = ({artist}) => {
  return (
    <>
        <h1>{artist.username}</h1>
        <img src={artist.profile_img} alt={artist.username} />
        <p>{artist.first_name} {artist.last_name}</p>
    </>
  )
}

export default ArtistCard