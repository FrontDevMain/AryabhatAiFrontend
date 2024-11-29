import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import google from '../../assets/login/google.svg.svg';
import fb from '../../assets/login/fb.svg.svg';
import fetcher from 'src/utils/fetcher';
import { LoadingButton } from '@mui/lab';

type FormValuesProps = {
  email: string;
  password: string;
};

const IconStyle = {
  height: 50,
  cursor: 'pointer',
};

function AuthLoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email or mobile number is required')
      .test(
        'valid-email-or-mobile',
        'Enter a valid email address or mobile number',
        function (value) {
          const isEmail = Yup.string().email().isValidSync(value);
          const isMobile = Yup.string()
            .matches(/^[0-9]{10}$/, 'Invalid mobile number')
            .isValidSync(value);

          return isEmail || isMobile;
        }
      ),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = new URLSearchParams();
      body.append('grant_type', 'password'); // Replace if another grant type is needed
      body.append('username', data.email);
      body.append('password', data.password);
      body.append('scope', ''); // Optional: Add a specific scope if required
      body.append('client_id', 'YOUR_CLIENT_ID'); // Replace with your client ID
      body.append('client_secret', 'YOUR_CLIENT_');

      const Response = await fetcher.post('auth/login', body);
      console.log(Response);
    } catch (err) {
      console.log(err.detail);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" textAlign={'center'} mb={3}>
        Login
      </Typography>
      <Stack gap={2}>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Email
          </Typography>
          <RHFTextField name="email" />
        </Stack>

        <Stack>
          <Typography variant="body2" color="text.secondary">
            Password
          </Typography>
          <RHFTextField
            name="password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          variant="body2"
          color="primary"
          underline="none"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot password
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="medium"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>

      <Typography textAlign={'center'} my={2}>
        If you don’t have an account?
        <Link
          variant="body2"
          color="primary"
          underline="none"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/signup')}
        >
          Signup
        </Link>
      </Typography>

      <Divider>Or continue with</Divider>
      <Stack my={1} flexDirection={'row'} gap={1} justifyContent={'center'}>
        <img src={google} alt="login with google" style={IconStyle} />
        <img src={fb} alt="login with facebook" style={IconStyle} />
      </Stack>
    </FormProvider>
  );
}

export default AuthLoginForm;
