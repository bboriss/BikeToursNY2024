import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../Loader/Loader';
import { Box } from '@mui/material';
import styles from './TourCard.module.scss'

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });

interface TourCardProps {
  startLocation: { type: string; coordinates: [number, number] };
  endLocation: { type: string; coordinates: [number, number] };
  startStationName: string;
  endStationName: string;
}

const TourCard: React.FC<TourCardProps> = ({ startLocation, endLocation, startStationName, endStationName }) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure the component only renders after the client has mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader/>;
  }
console.log(startLocation)
  return (
    <Box className={styles.tourCard}>
      <MapContainer
        center={[startLocation.coordinates[1], startLocation.coordinates[0]] as [number, number]}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={[startLocation.coordinates[1], startLocation.coordinates[0]] as [number, number]} />
        <Marker position={[endLocation.coordinates[1], endLocation.coordinates[0]] as [number, number]} />
      </MapContainer>
      <p className={styles.description}>From: {startStationName}</p>
      <p className={styles.description}>To: {endStationName}</p>
    </Box>
  );
};

export default TourCard;
