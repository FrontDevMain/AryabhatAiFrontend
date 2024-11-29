import {
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

type FormValuesProps = {
  email: string;
};

function ForgotPassword() {
  const navigate = useNavigate();

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
  });

  const defaultValues = {
    email: '',
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

  const onSubmit = (data: FormValuesProps) => {
    navigate('/verify-forgot-password-otp');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" textAlign={'center'}>
        Forgot Password
      </Typography>
      <Typography color="text.disabled" textAlign={'center'} sx={{ width: '80%', margin: 'auto' }}>
        Enter your email for the verification process. we will send 6 digit code to your email
      </Typography>
      <Stack gap={2} mt={4}>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Email
          </Typography>
          <RHFTextField name="email" />
        </Stack>

        <Button fullWidth size="medium" type="submit" variant="contained">
          Continue
        </Button>
        <Typography textAlign={'center'} my={2}>
          Already have an account?
          <Link
            variant="body2"
            color="primary"
            underline="none"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Login
          </Link>
        </Typography>
      </Stack>
    </FormProvider>
  );
}

export default ForgotPassword;
