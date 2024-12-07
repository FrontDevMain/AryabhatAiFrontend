import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";

// ----------------------------------------------------------------------

type Props = Omit<DatePickerProps<any, false>, "slotProps" | "slots"> & {
  name: string;
  textFieldProps?: TextFieldProps;
};

export default function RHFDatePicker({
  name,
  textFieldProps,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          {...other}
          format="YYYY/MM/DD"
          value={field.value || null} // Ensure null when undefined
          onChange={(date) => field.onChange(date)} // Update field value
          slotProps={{
            textField: {
              ...textFieldProps,
              fullWidth: true,
              size: "small",
              error: !!error,
              helperText: error?.message,
            },
          }}
        />
      )}
    />
  );
}
