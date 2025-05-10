import React, { useEffect, useRef, useState } from 'react';

const DirectionsMap = () => {
  const mapRef = useRef(null);
  const [destination, setDestination] = useState('');

  useEffect(() => {
    if (!window.google) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const map = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 14,
      });

      const marker = new window.google.maps.Marker({
        position: userLocation,
        map,
        title: 'Your Location',
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      if (destination) {
        directionsService.route(
          {
            origin: userLocation,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(response);
            } else {
              alert('Directions request failed due to ' + status);
            }
          }
        );
      }
    });
  }, [destination]);

  return (
    <div>
      <h2>Get Directions to a Hardware Store</h2>
      <input
        type="text"
        placeholder="Enter store name or address"
        onBlur={(e) => setDestination(e.target.value)}
      />
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default DirectionsMap;
