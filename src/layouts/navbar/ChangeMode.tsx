// @mui
import { RadioGroup, Stack, Typography } from '@mui/material';
//
import { useSettingsContext } from '../../components/settings';
import { StyledCard, StyledWrap, MaskControl } from './styles';
import LightMode from 'src/assets/navbar/LightMode';
import DarkMode from 'src/assets/navbar/DarkMode';

// ----------------------------------------------------------------------

const OPTIONS = ['light', 'dark'] as const;

export default function ChangeMode() {
  const { themeMode, onChangeMode } = useSettingsContext();

  return (
    <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
      <StyledWrap>
        {OPTIONS.map((mode) => (
          <StyledCard key={mode} selected={themeMode === mode}>
            <Stack flexDirection={'row'} gap={1}>
              {mode == 'light' ? <LightMode /> : <DarkMode />}
              <Typography
                sx={{
                  textTransform: 'capitalize',
                  color: 'text.primary',
                  fontSize: 16,
                }}
              >
                {mode}
              </Typography>
            </Stack>
            <MaskControl value={mode} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
