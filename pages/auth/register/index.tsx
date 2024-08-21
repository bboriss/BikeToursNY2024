import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextField, Button, Box, Typography, IconButton, InputAdornment, FormControlLabel, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { registerUser } from '../../../redux/thunks/authThunks';
import AuthLayout from '../../../components/Layout/AuthLayout';
import { useRouter } from 'next/router';
import styles from './../../../styles/AuthForm.module.scss';

const Register: React.FC = () => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.auth.loading);
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleClearUsername = () => setUsername('');
  const handleClearPassword = () => setPassword('');
  const handleClearFirstName = () => setFirstName('');
  const handleClearLastName = () => setLastName('');
  const handleClearEmail = () => setEmail('');

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!firstName) tempErrors.firstName = t('auth.firstNameRequired');
    if (!lastName) tempErrors.lastName = t('auth.lastNameRequired');
    if (!email) tempErrors.email = t('auth.emailRequired');
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) tempErrors.email = t('auth.invalidEmail');
    if (!username) tempErrors.username = t('auth.usernameRequired');
    if (!password) tempErrors.password = t('auth.passwordRequired');
    else if (password.length < 8) tempErrors.password = t('auth.passwordTooShort');

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      dispatch(
        registerUser({
          firstName,
          lastName,
          email,
          username,
          password,
        })
      ).then(() => {
        router.push('/tours');
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    }

    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
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

  return (
    <AuthLayout>
      <Box className={styles.formWrapper}>
        <Typography variant="h4" className={styles.formTitle}>{t('auth.register')}</Typography>

        <TextField
          label={t('auth.firstName')}
          variant="outlined"
          fullWidth
          margin="normal"
          className={styles.textField}
          value={firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
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
              firstName && (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleClearFirstName}
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
                backgroundColor: 'none',
              },
              fontSize: '12px',
            },
          }}
        />

        <TextField
          label={t('auth.lastName')}
          variant="outlined"
          fullWidth
          margin="normal"
          className={styles.textField}
          value={lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
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
              lastName && (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleClearLastName}
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
                backgroundColor: 'none',
              },
              fontSize: '12px',
            },
          }}
        />

        <TextField
          label={t('auth.email')}
          variant="outlined"
          fullWidth
          margin="normal"
          className={styles.textField}
          value={email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
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
              email && (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleClearEmail}
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
                backgroundColor: 'none',
              },
              fontSize: '12px',
            },
          }}
        />

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
                backgroundColor: 'none',
              },
              fontSize: '12px',
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
                backgroundColor: 'none',
              },
              fontSize: '12px',
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
            color: 'white',
          }}
        />
        
        <Button
          variant="contained"
          fullWidth
          className={styles.submitButton}
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? t('auth.wait') : t('auth.register')}
        </Button>
        
        <Typography className={styles.linkText}>
          {t('auth.haveAccount')}?{' '}
          <Link href="/auth/login" passHref legacyBehavior>
            <a className={styles.link}>{t('auth.login')}</a>
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

export default Register;
