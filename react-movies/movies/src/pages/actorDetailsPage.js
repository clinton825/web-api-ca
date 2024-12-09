import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPersonWithCredits } from '../api/tmdb-api'; // Updated to include combined_credits

const ActorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const { data: actor, isLoading, isError, error } = useQuery(
    ['person', { id }],
    getPersonWithCredits // Fetch person details with combined_credits
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Back
      </button>

      {actor && (
        <div>
          <h2 style={{ marginBottom: '20px' }}>{actor.name}</h2>

          {/* Actor Profile Image */}
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              style={{ width: 200, height: 300, objectFit: 'cover', borderRadius: '10px' }}
            />
          )}

          <p><strong>Biography:</strong> {actor.biography}</p>
          <p><strong>Birthday:</strong> {actor.birthday}</p>
          <p><strong>Place of Birth:</strong> {actor.place_of_birth}</p>
          <p><strong>Gender:</strong> {actor.gender === 1 ? 'Female' : 'Male'}</p>

          {/* Known For Section */}
          {actor.combined_credits?.cast && actor.combined_credits.cast.length > 0 && (
            <>
              <h3>Popular Movies/TV Shows:</h3>
              <div style={{ display: 'flex', overflowX: 'scroll', padding: '10px', gap: '10px' }}>
                {actor.combined_credits.cast
                  .sort((a, b) => b.popularity - a.popularity) // Sort by popularity
                  .slice(0, 10) // Limit to top 10 known works
                  .map((work) => (
                    <div key={work.id} style={{ minWidth: 150, textAlign: 'center' }}>
                      {work.poster_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${work.poster_path}`} 
                          alt={work.title || work.name} 
                          style={{ width: 150, height: 225, objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ) : (
                        <div 
                          style={{
                            width: 150, 
                            height: 225, 
                            background: '#ccc', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            borderRadius: '4px'
                          }}
                        >
                          No Image
                        </div>
                      )}
                      <p>{work.title || work.name}</p>
                      <p style={{ fontSize: '0.9em', color: '#666' }}>
                        {work.release_date ? work.release_date.split('-')[0] : 'N/A'}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ActorDetailsPage;
