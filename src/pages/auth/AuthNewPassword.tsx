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
  password: string;
};

function AuthNewPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
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

  const onSubmit = (data: FormValuesProps) => {
    console.log(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" textAlign={'center'}>
        New Password
      </Typography>
      <Typography color="text.disabled" textAlign={'center'} sx={{ width: '80%', margin: 'auto' }}>
        Set the new password for your account so you can login and access all features
      </Typography>
      <Stack gap={2} mt={4}>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Enter New Password
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
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Confirm Password
          </Typography>
          <RHFTextField
            name="confirmPassword"
            type={showPassword1 ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword1(!showPassword1)} edge="end">
                    <Icon icon={showPassword1 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Button fullWidth size="medium" type="submit" variant="contained">
          Update Password
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default AuthNewPassword;
