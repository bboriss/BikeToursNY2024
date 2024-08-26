import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Box, Button, Popover, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '../../redux/hooks';
import styles from './TourCard.module.scss';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const RoutingMachine = dynamic(() => import('./../RoutingMachine/RoutingMachine'), { ssr: false });

interface TourCardProps {
  id: string;
  startLocation: { type: string; coordinates: [number, number] };
  endLocation: { type: string; coordinates: [number, number] };
  startStationName: string;
  endStationName: string;
}

const TourCard: React.FC<TourCardProps> = ({ id, startLocation, endLocation, startStationName, endStationName }) => {
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleExploreClick = () => {
    if (isAuthenticated) {
      router.push(`/tours/${id}`);
    }
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!isAuthenticated) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (!isClient) {
    return null;
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
        <RoutingMachine startLocation={startLocation} endLocation={endLocation} />
      </MapContainer>
      <p className={styles.description}><b>{t('tours.from')}</b>: {startStationName}</p>
      <p className={styles.description}><b>{t('tours.to')}</b>: {endStationName}</p>
      <Box className={styles.buttonContainer}>
        <Button
          variant="contained"
          className={isAuthenticated ? styles.exploreButton : styles.disabled}
          onClick={handleExploreClick}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {t('tours.explore')}
        </Button>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none'
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 2 }}>{t('auth.loginRequired')}</Typography>
        </Popover>
      </Box>
    </Box>
  );
};

export default TourCard;
