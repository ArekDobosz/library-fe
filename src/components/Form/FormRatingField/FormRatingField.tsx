import { Control, Controller, type FieldValues } from "react-hook-form";

import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import Rating, { type RatingProps } from "@mui/material/Rating";

export type FormRatingFieldProps<TValues extends FieldValues> = Omit<
  RatingProps,
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

export const FormRatingField = <TValues extends FieldValues>({
  id,
  name,
  control,
  label,
  adornment,
  optional,
  ...ratingProps
}: FormRatingFieldProps<TValues>) => {
  return (
    <Controller
      // @ts-expect-error: For some reason TS reports an error
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          variant="standard"
          fullWidth
          error={!!error}
          sx={{ display: "flex", flexDirection: "row" }}>
          <Typography component="legend">{label}: </Typography>
          <Rating
            defaultValue={2.5}
            precision={0.5}
            {...field}
            {...ratingProps}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
