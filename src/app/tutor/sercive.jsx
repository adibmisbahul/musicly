export async function fetchAndAddTracks() {
    const initialTracks = [
      {
        imageArtis: 'heavenSent',
        url: 'https://audio.jukehost.co.uk/Ek3A05BspOvUMD5B0Tc4jEe0JccOyy55',
        title: 'Heaven Sent',
        durasi: '2:50',
        tags: ['dnb'],
      },
    ];
  
    try {
      const res = await fetch('http://localhost:1000/tracks');
      const newData = await res.json();
  
      // Update the tracks variable with the new data
      const updatedTracks = [...initialTracks, ...newData];
      return updatedTracks;
    } catch (error) {
      console.error('Error fetching data:', error);
      return initialTracks; // Return the initial tracks in case of an error
    }
  }