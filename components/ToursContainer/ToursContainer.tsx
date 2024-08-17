import React from 'react';
import { Box } from '@mui/material';
import TourCard from './../TourCard/TourCard';
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
}

const ToursContainer: React.FC<ToursContainerProps> = ({ tours }) => {
  return (
    <Box className={styles.toursContainer}>
      {tours.map((tour) => (
        <TourCard
          key={tour._id}
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
