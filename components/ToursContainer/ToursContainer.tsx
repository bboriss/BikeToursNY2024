import React from 'react';
import { Box, Typography } from '@mui/material';
import TourCard from './../TourCard/TourCard';
import Loader from '../Loader/Loader';
import { useTranslation } from 'next-i18next';
import styles from './ToursContainer.module.scss';

interface Tour {
  _id: string;
  'start station location': { type: string; coordinates: [number, number] };
  'end station location': { type: string; coordinates: [number, number] };
  'start station name': string;
  'end station name': string;
}

interface ToursContainerProps {
  tours: Tour[];
  loading: boolean;
  searchValue: string;
}

const ToursContainer: React.FC<ToursContainerProps> = ({ tours, loading, searchValue }) => {
  const { t } = useTranslation('common');

  if (loading) {
    return <Loader variant="container" />;
  }

  if (tours.length === 0) {
    return (
      <Box>
        <Typography variant="h1" className={styles.noResultsText}>
          {t('tours.noResults', { searchValue })}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.toursContainer}>
      {tours.map((tour) => (
        <TourCard
          key={tour._id}
          id={tour._id}
          startLocation={tour['start station location']}
          endLocation={tour['end station location']}
          startStationName={tour['start station name']}
          endStationName={tour['end station name']}
        />
      ))}
    </Box>
  );
};

export default ToursContainer;
