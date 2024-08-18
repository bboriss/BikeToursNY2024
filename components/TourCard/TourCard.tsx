import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../Loader/Loader';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import styles from './TourCard.module.scss';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });

interface TourCardProps {
  startLocation: { type: string; coordinates: [number, number] };
  endLocation: { type: string; coordinates: [number, number] };
  startStationName: string;
  endStationName: string;
}

const TourCard: React.FC<TourCardProps> = ({ startLocation, endLocation, startStationName, endStationName }) => {
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  return (
    <Box className={styles.tourCard}>
      <MapContainer
        center={[startLocation.coordinates[1], startLocation.coordinates[0]] as [number, number]}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', marginBottom: '6px' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <Marker position={[startLocation.coordinates[1], startLocation.coordinates[0]] as [number, number]} />
        <Marker position={[endLocation.coordinates[1], endLocation.coordinates[0]] as [number, number]} /> */}
      </MapContainer>
      <p className={styles.description}><b>{t('tours.from')}</b>: {startStationName}</p>
      <p className={styles.description}><b>{t('tours.to')}</b>: {endStationName}</p>
      <Box className={styles.buttonContainer}>
        <Button variant="contained" className={styles.exploreButton}>
          {t('tours.explore')}
        </Button>
      </Box>
    </Box>
  );
};

export default TourCard;
