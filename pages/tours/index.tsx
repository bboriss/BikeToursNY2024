import React, { useState, useEffect } from 'react';
import { Box, Pagination, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ToursLayout from '../../components/Layout/ToursLayout';
import TourFilters from '../../components/ToursFilters/ToursFilters';
import ToursContainer from '../../components/ToursContainer/ToursContainer';
import apiEndpoints from '../../config/apiEndpoints';
import axios from 'axios';
import styles from './Tours.module.scss';

interface Tour {
  _id: string;
  'start station location': { type: string; coordinates: [number, number] };
  'end station location': { type: string; coordinates: [number, number] };
  'start station name': string;
  'end station name': string;
}

const Tours: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [totalItems, setTotalItems] = useState<number>(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiEndpoints.tours, {
          params: {
            search: debouncedSearchValue,
            sort: sortValue,
            page: page,
            limit: itemsPerPage,
          },
        });
        setTours(response.data.tours);
        setTotalItems(response.data.totalTours);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [debouncedSearchValue, sortValue, page]);

  useEffect(() => {
    if (router.query.welcome === 'true') {
      if (router.query.firstName && router.query.lastName) {
        setWelcomeMessage(t('welcomeUserFull', { firstName: router.query.firstName, lastName: router.query.lastName }));
      } else if (router.query.username) {
        setWelcomeMessage(t('welcomeUserBack', { username: router.query.username }));
      }
      setSnackbarOpen(true);
    }
  }, [router.query, t]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };
  
  const handleSortChange = (value: string) => {
    setSortValue(value);
    setPage(1);
  };

  return (
    <ToursLayout>
      <Box className={styles.allToursContainer}>
        <h2 className={styles.pageTitle}>
          {t('findYourTour')}
        </h2>
        <TourFilters 
          searchValue={searchValue} 
          setSearchValue={handleSearchChange} 
          sortValue={sortValue} 
          setSortValue={handleSortChange} 
        />
        <ToursContainer tours={tours} loading={loading} searchValue={searchValue} />
        {!loading && totalItems !== 0 && <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={page}
          siblingCount={isMobile ? 0 : 1}
          boundaryCount={isMobile ? 1 : 2}
          variant="outlined"
          size={isMobile ? 'medium' : 'large'}
          onChange={handlePageChange}
          color="primary"
          className={styles.pagination}
          sx={{
            '& .MuiPaginationItem-root': {
              color: theme.palette.paginationColor,
              fontSize: '10px',
              borderColor: '#272829',
              backgroundColor: '#272829',
            },
            '& .MuiPaginationItem-root.Mui-selected, .MuiPaginationItem-root.Mui-selected:hover': {
              backgroundColor: '#f7b731',
              borderColor: '#272829',
              color: '#272829',
            }
          }}
        />}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{
              width: '320px',
              fontSize: '12px',
              backgroundColor: '#f7b731',
              color: '#272829',
            }}
          >
            {welcomeMessage}
          </Alert>
        </Snackbar>
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
