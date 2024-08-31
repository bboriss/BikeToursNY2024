import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextField, Button, Box, Typography, IconButton, InputAdornment, FormControlLabel, Checkbox, Snackbar, Alert } from '@mui/material';
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
  const error = useAppSelector((state: RootState) => state.auth.error);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleClearUsername = () => setUsername('');
  const handleClearPassword = () => setPassword('');

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!username) tempErrors.username = t('auth.usernameRequired');
    if (!password) tempErrors.password = t('auth.passwordRequired');

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(
        loginUser({
          username,
          password,
        })
      ).then((action) => {
        if (loginUser.fulfilled.match(action)) {
          const { username } = action.payload;
          router.push({
            pathname: '/tours',
            query: { welcome: 'true', username },
          });
        } else {
          setOpenSnackbar(true);
        }
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    }

    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          onChange={(e) => handleInputChange('username', e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
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
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
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
          {isLoading ? t('auth.processing') : t('auth.login')}
        </Button>
        <Typography className={styles.linkText}>
          {t('auth.noAccount')}{' '}
          <Link href="/auth/register" passHref legacyBehavior>
            <a className={styles.link}>{t('auth.register')}</a>
          </Link>
        </Typography>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          top: { xs: -10, sm: -150 },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#f7b731'
          }}
        >
          {error || t('auth.loginFailed')}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default Login;
