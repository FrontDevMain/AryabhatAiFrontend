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

type FormValuesProps = {
  username: string;
  fName: string;
  lName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

function AuthSignUpDetails() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(),
    fName: Yup.string().required(),
    lName: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    country: Yup.string().required(),
    pincode: Yup.string().required(),
  });

  const defaultValues = {
    username: '',
    fName: '',
    lName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
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
    navigate('/');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" textAlign={'center'} mb={3}>
        Signup
      </Typography>
      <Stack gap={2}>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Username
          </Typography>
          <RHFTextField name="username" />
        </Stack>
        <Stack direction={'row'} gap={2}>
          <Stack width={'100%'}>
            <Typography variant="body2" color="text.secondary">
              First Name
            </Typography>
            <RHFTextField name="fName" />
          </Stack>
          <Stack width={'100%'}>
            <Typography variant="body2" color="text.secondary">
              Last Name
            </Typography>
            <RHFTextField name="lName" />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Email
          </Typography>
          <RHFTextField name="email" />
        </Stack>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Phone No.
          </Typography>
          <RHFTextField name="phone" />
        </Stack>
        <Stack direction={'row'} gap={2}>
          <Stack width={'100%'}>
            <Typography variant="body2" color="text.secondary">
              City
            </Typography>
            <RHFTextField name="city" />
          </Stack>
          <Stack width={'100%'}>
            <Typography variant="body2" color="text.secondary">
              State
            </Typography>
            <RHFTextField name="state" />
          </Stack>
        </Stack>
        <Stack direction={'row'} gap={2}>
          <Stack width={'100%'}>
            <Typography variant="body2" color="text.secondary">
              Country
            </Typography>
            <RHFTextField name="country" />
          </Stack>
          <Stack width={'100%'}>
            <Typography variant="body2" color="text.secondary">
              Pincode
            </Typography>
            <RHFTextField name="pincode" />
          </Stack>
        </Stack>

        <Button fullWidth size="medium" type="submit" variant="contained">
          Continue
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default AuthSignUpDetails;
