import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ToursLayout from '../../components/Layout/ToursLayout';
import TourFilters from '../../components/ToursFilters/ToursFilters';
import ToursContainer from '../../components/ToursContainer/ToursContainer';
import apiEndpoints from '../../config/apiEndpoints';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import styles from './Tours.module.scss';

interface Tour {
  _id: string;
  'start station location': { type: string; coordinates: [number, number] };
  'end station location': { type: string; coordinates: [number, number] };
  'start station name': string;
  'end station name': string;
}

const Tours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('shortest');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(apiEndpoints.tours);
        setTours(response.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ToursLayout>
      <Box className={styles.allToursContainer}>
        <Typography variant="h4" className={styles.pageTitle}>
          {/* {t('common.findYourTour')} */}
          Find yout tour
        </Typography>
        <TourFilters 
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
          sortValue={sortValue} 
          setSortValue={setSortValue} 
        />
        <ToursContainer tours={tours} />
      </Box>
    </ToursLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default Tours;
