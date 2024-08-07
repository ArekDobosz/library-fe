import { Control, Controller, type FieldValues } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import TextField, { type TextFieldProps } from "@mui/material/TextField";

export type FormTextFieldProps<TValues extends FieldValues> = Omit<
  TextFieldProps,
  "variant"
> & {
  id: string;
  name: string;
  control: Control<TValues>;
  label: string;
  adornment?: React.ReactNode;
  optional?: boolean;
  disabled?: boolean;
};

export const FormTextField = <TValues extends FieldValues>({
  id,
  name,
  control,
  label,
  adornment,
  optional,
  type = "text",
  disabled = false,
  ...textFieldProps
}: FormTextFieldProps<TValues>) => {
  return (
    <Controller
      // @ts-expect-error: For some reason TS reports an error
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl variant="standard" fullWidth error={!!error}>
          <TextField
            id={id}
            type={type}
            error={!!error}
            disabled={disabled}
            variant="outlined"
            data-testid={name}
            label={label}
            sx={{
              ...textFieldProps.sx,
              borderRadius: 10,
            }}
            InputProps={{
              ...(adornment ? { endAdornment: adornment } : {}),
            }}
            {...field}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormTextField;
