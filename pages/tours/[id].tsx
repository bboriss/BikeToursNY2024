import React from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import apiEndpoints from '../../config/apiEndpoints';
import ToursLayout from '../../components/Layout/ToursLayout';
import { ParsedUrlQuery } from "querystring";
import styles from '../tours/Tours.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { intervalToDuration, formatDuration } from 'date-fns';

interface Params extends ParsedUrlQuery {
  id: string;
}

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const RoutingMachine = dynamic(() => import('../../components/RoutingMachine/RoutingMachine'), { ssr: false });

interface TourDetailsProps {
  tour: {
    'start station location': { type: string; coordinates: [number, number] };
    'end station location': { type: string; coordinates: [number, number] };
    'start station name': string;
    'end station name': string;
    tripduration: number;
    bikeid: number;
    usertype: string;
  };
}

const formatTripDuration = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  if (duration.hours) {
    return formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] });
  } else if (duration.minutes) {
    return formatDuration(duration, { format: ['minutes', 'seconds'] });
  } else {
    return `${seconds} seconds`;
  }
};

const TourDetails: React.FC<TourDetailsProps> = ({ tour }) => {
  return (
    <ToursLayout>
      <Box className={styles.tourDetailsContainer}>
        <Box className={styles.leftContainer}>
          <MapContainer
            center={[tour['start station location'].coordinates[1], tour['start station location'].coordinates[0]] as [number, number]}
            zoom={14}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <RoutingMachine
              startLocation={tour['start station location']}
              endLocation={tour['end station location']}
            />
          </MapContainer>
        </Box>
        <Box className={styles.rightContainer}>
          <h4 className={styles.tourTitle}>
            {tour['start station name']} to {tour['end station name']}
          </h4>
          <p className={styles.tourInfo}>
            <strong>Trip Duration:</strong> {formatTripDuration(tour.tripduration)}
          </p>
          <p className={styles.tourInfo}>
            <strong>Bike ID:</strong> {tour.bikeid}
          </p>
          <p className={styles.tourInfo}>
            <strong>User Type:</strong> {tour.usertype}
          </p>
        </Box>
      </Box>
    </ToursLayout>
  );
};

export default TourDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const { locale } = context;

  try {
    const response = await axios.get(`${apiEndpoints.getTourById(id)}`);

    return {
      props: {
        tour: response.data,
        ...(await serverSideTranslations(locale || 'en', ['common'])),
      },
    };
  } catch (error) {
    console.error('Error fetching tour:', error);
    return {
      notFound: true,
    };
  }
};
