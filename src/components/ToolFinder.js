import React, { useEffect, useRef } from 'react';

const ToolFinder = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const map = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 15,
        });

        const service = new window.google.maps.places.PlacesService(map);
        const request = {
          location: userLocation,
          radius: '2000',
          keyword: 'hardware store',
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place) => {
              new window.google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
              });
            });
          }
        });

        new window.google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Your Location',
        });
      },
      (error) => {
        alert('Error getting location. Please allow location access.');
        console.error(error);
      }
    );
  }, []);

  return (
    <div>
      <h2>Find Hardware Stores Near You</h2>
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default ToolFinder;
