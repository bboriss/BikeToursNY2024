import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

interface RoutingMachineProps {
  startLocation: { type: string; coordinates: [number, number] };
  endLocation: { type: string; coordinates: [number, number] };
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ startLocation, endLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const waypoints = [
      L.latLng(startLocation.coordinates[1], startLocation.coordinates[0]),
      L.latLng(endLocation.coordinates[1], endLocation.coordinates[0]),
    ];

    let routingControl = L.Routing.control({
      waypoints,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
      },
      createMarker: () => null,
    }).addTo(map);

    return () => {
      if (map && routingControl) {
        try {
          routingControl.getPlan().setWaypoints([]); // Safely clear waypoints
          map.removeControl(routingControl); // Safely remove control
        } catch (error) {
          console.error('Error during map cleanup:', error);
        }
      }
    };
  }, [map, startLocation, endLocation]);

  return null;
};

export default RoutingMachine;
