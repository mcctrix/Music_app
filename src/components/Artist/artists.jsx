import React, { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useFetch } from "../../zustand/store";
function RandomArtists({ search }) {
  const navigate = useNavigate();
  const { artists, fetchArtists } = useFetch();
  useEffect(() => {
    fetchArtists(search);
  }, [search]);
  function handleClick(Id) {
    const path = {
      pathname: "/artist",
      search: createSearchParams({ Id }).toString(),
    };
    navigate(path);
  }
  return (
    <>
      {artists && (
        <div className="mt-4 mb-[15dvh] w-[95vw] sm:w-full border rounded-xl p-4">
          <h2 className="text-2xl font-bold mb-4">Artists</h2>
          <div className="flex space-x-4 px-4 overflow-x-scroll">
            {artists?.map((artist, i) => (
              <div
                key={i}
                className="flex-none w-40 group mb-4 rounded-lg bg-secondary"
                onClick={() => handleClick(artist.id)}
              >
                <div className="flex flex-col items-center aspect-square mb-2 overflow-hidden rounded-lg">
                  {artist?.image[2] ? (
                    <img
                      src={artist?.image[2].url}
                      alt={artist?.name}
                      loading="lazy"
                      className="w-32 h-32 object-cover rounded-lg mt-2 transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-medium truncate w-32 text-center">
                  {artist?.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default RandomArtists;
