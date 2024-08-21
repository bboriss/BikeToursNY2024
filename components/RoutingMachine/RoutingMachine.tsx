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

  const locationSVGPath = `
    M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z
  `;

  const startIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#272829" width="28px" height="28px">
             <path d="${locationSVGPath}" />
           </svg>`,
    iconSize: [28, 28],
    className: 'custom-marker-icon',
  });

  const endIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#272829" width="28px" height="28px">
             <path d="${locationSVGPath}" />
           </svg>`,
    iconSize: [28, 28],
    className: 'custom-marker-icon',
  });

  useEffect(() => {
    if (!map) return;

    const waypoints = [
      L.latLng(startLocation.coordinates[1], startLocation.coordinates[0]),
      L.latLng(endLocation.coordinates[1], endLocation.coordinates[0]),
    ];

    const routingControl = L.Routing.control({
      waypoints,
      lineOptions: {
        styles: [{ color: 'red', weight: 3 }],
      },
      routeWhileDragging: false,
      showAlternatives: false,
      createMarker: (i: any, waypoint: any) => {
        return i === 0
          ? L.marker(waypoint.latLng, { icon: startIcon })
          : L.marker(waypoint.latLng, { icon: endIcon });
      },
      addWaypoints: false,
      draggableWaypoints: false,
    }).addTo(map);

    const routingControlContainer = routingControl.getContainer();
    const controlContainerParent = routingControlContainer.parentNode;
    if (controlContainerParent) {
      controlContainerParent.removeChild(routingControlContainer);
    }

    return () => {
      if (map && routingControl) {
        try {
          routingControl.getPlan().setWaypoints([]);
          map.removeControl(routingControl);
        } catch (error) {
          console.error('Error during map cleanup:', error);
        }
      }
    };
  }, [map, startLocation, endLocation]);

  return null;
};

export default RoutingMachine;
