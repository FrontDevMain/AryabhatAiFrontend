import { Theme } from '@mui/material/styles';
//

import Input from './Input';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(Input(theme));
}
