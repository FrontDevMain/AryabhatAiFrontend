import { Theme } from "@mui/material/styles";
//

import Input from "./Input";
import Table from "./Table";
import Chip from "./Chip";
import Button from "./Button";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(Input(theme), Table(theme), Chip(theme), Button(theme));
}
