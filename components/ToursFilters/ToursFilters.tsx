import React from 'react';
import { TextField, IconButton, InputAdornment, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'next-i18next';
import styles from './ToursFiltersr.module.scss';

interface TourFiltersProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  sortValue: string;
  setSortValue: (value: string) => void;
}

const TourFilters: React.FC<TourFiltersProps> = ({ searchValue, setSearchValue, sortValue, setSortValue }) => {
  const { t } = useTranslation('common');
  const theme = useTheme();

  const handleClearSearch = () => setSearchValue('');

  return (
    <Box className={styles.filtersContainer}>
      <TextField
        label={t('tours.searchByStreet')}
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        InputLabelProps={{
          sx: {
            '&.Mui-focused': {
              color: theme.palette.text.secondary,
            },
            fontSize: '12px',
          },
        }}
        InputProps={{
          endAdornment: (
            searchValue && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClearSearch}
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      color: 'white',
                    },
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          ),
          sx: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.text.secondary,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.formColors.hover,
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
            input: {
              color: '#EEEEEE',
            },
            fontSize: '12px',
            backgroundColor: '#272829',
          },
        }}
      />
      <FormControl fullWidth margin="normal" variant="outlined" className={styles.sortSelect}>
        <InputLabel 
          id="sort-label"
          sx={{
            fontSize: '12px',
            '&.Mui-focused': {
              color: theme.palette.text.secondary,
            },
          }}
        >
          {t('tours.sortByDuration')}
        </InputLabel>
        <Select
          labelId="sort-label"
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value as string)}
          label={t('tours.sortByDuration')}
          sx={{
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.text.secondary,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.formColors.hover,
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
            input: {
              color: '#EEEEEE',
            },
            fontSize: '12px',
            backgroundColor: '#272829',
          }}
        >
          {sortValue !== "" && <MenuItem value="">
            {t('tours.disable')}
          </MenuItem> }
          <MenuItem value="shortest">{t('tours.shortestFirst')}</MenuItem>
          <MenuItem value="longest">{t('tours.longestFirst')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TourFilters;
