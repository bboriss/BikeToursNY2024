import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextField, Button, Box, Typography, IconButton, InputAdornment, FormControlLabel, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import AuthLayout from '../../../components/Layout/AuthLayout';
import styles from './../../../styles/AuthForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { loginUser } from '../../../redux/thunks/authThunks';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.auth.loading);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClearUsername = () => setUsername('');
  const handleClearPassword = () => setPassword('');

  const handleLogin = () => {
    dispatch(
      loginUser({
        username,
        password,
      })
    ).then(() => {
      router.push('/tours');
    });
  };

  return (
    <AuthLayout>
      <Box className={styles.formWrapper}>
        <Typography variant="h4" className={styles.formTitle}>{t('auth.login')}</Typography>
        <TextField
          label={t('auth.username')}
          variant="outlined"
          fullWidth
          margin="normal"
          className={styles.textField}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
              username && (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleClearUsername}
                    sx={{
                      color: theme.palette.primary.main,
                      '&:hover': {
                        color: 'white'
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
              backgroundColor: 'none'
            },
          }}
        />
        <TextField
          label={t('auth.password')}
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          className={styles.textField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
              password && (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleClearPassword}
                    sx={{
                      color: theme.palette.primary.main,
                      '&:hover': {
                        color: 'white'
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
              backgroundColor: 'none'
            },
          }}
        />
        <FormControlLabel
          className={styles.showPassword}
          control={
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              sx={{
                color: theme.palette.primary.main,
                '&.Mui-checked': {
                  color: theme.palette.formColors.yellow,
                },
              }}
            />
          }
          label={t('auth.showPassword')}
          sx={{
            color: '#ffffff',
            fontSize: '14px'
          }}
        />
        <Button
          variant="contained"
          fullWidth
          className={styles.submitButton}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? t('auth.wait') : t('auth.login')}
        </Button>
        <Typography className={styles.linkText}>
          {t('auth.noAccount')}{' '}
          <Link href="/auth/register" passHref legacyBehavior>
            <a className={styles.link}>{t('auth.register')}</a>
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default Login;
