import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getPopularPeople } from "../api/tmdb-api";

const ActorsPage = () => {
  const navigate = useNavigate();
  const { data: popularActors, isLoading, isError, error } = useQuery(
    "popularActors",
    getPopularPeople
  );

  const [selectedActor, setSelectedActor] = useState(null);

  // Log the fetched data to the console
  useEffect(() => {
    if (popularActors) {
      console.log("Fetched actors data:", popularActors);
    }
  }, [popularActors]);

  // Set default selected actor if available
  useEffect(() => {
    if (popularActors?.results?.length > 0) {
      setSelectedActor(popularActors.results[0]);
    }
  }, [popularActors]);

  // Handle actor click to navigate to details
  const handleActorClick = (actor) => {
    setSelectedActor(actor);
    navigate(`/actors/${actor.id}`);
  };

  // Loading state
  if (isLoading) {
    return <div>Loading actors...</div>;
  }

  // Error state
  if (isError) {
    return <div>Error loading actors: {error.message}</div>;
  }

  // Main rendering
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Popular Actors</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {popularActors?.results?.map((actor) => (
          <div
            key={actor.id}
            style={{
              width: "200px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => handleActorClick(actor)}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow =
                "0px 8px 15px rgba(0, 0, 0, 0.2)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow =
                "0px 4px 6px rgba(0, 0, 0, 0.1)")
            }
          >
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "#ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                No Image
              </div>
            )}
            <h3 style={{ margin: "10px 0" }}>{actor.name}</h3>
            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#007BFF")
              }
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click
                handleActorClick(actor);
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default ActorsPage;
