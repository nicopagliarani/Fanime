import React from 'react'

export function ButtonDelete({ anime, deleteSingleAnime }) {
    const handleDeleteAnime = () => {
        deleteSingleAnime(anime._id);
        console.log('Anime deleted');
      
      };
  return (
    <button onClick={()=> handleDeleteAnime()}>Delete</button>
  )
}

