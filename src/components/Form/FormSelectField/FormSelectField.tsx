import { useMemo, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import Box from "@mui/material/Box";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { InputLabel, SelectProps } from "@mui/material";

import { OptionType } from "@/types";

type Props<
  TValues extends FieldValues,
  TOptionType extends string | number,
> = SelectProps & {
  id: string;
  name: string;
  control: Control<TValues>;
  options: readonly OptionType<TOptionType>[];
  label: string;
  placeholder?: string;
  dataTestId?: string;
  definition?: Record<TOptionType, React.ReactNode>;
  disabled?: boolean;
};

export const FormSelectField = <
  TValues extends FieldValues,
  TOptionType extends string | number,
>({
  id,
  name,
  control,
  options,
  label,
  placeholder,
  dataTestId = "dropdown-select",
  disabled = false,
}: Props<TValues, TOptionType>): JSX.Element => {
  const [isSelectOpen, setSelectOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setSelectOpen(true);
  };

  const handleClose = () => {
    setSelectOpen(false);
  };

  const { watch } = useFormContext<TValues>();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const currentValue = watch(name as any);

  const displayValue = useMemo(
    () => options.find(({ value }) => value === currentValue)?.label,
    [currentValue, options]
  );

  return (
    <>
      <Controller
        // @ts-expect-error: For some reason TS reports an error
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <FormControl
              variant="outlined"
              fullWidth
              error={fieldState.invalid}
              disabled={disabled}>
              <InputLabel id={id}>{label}</InputLabel>
              <Select
                id={id}
                data-testid={dataTestId}
                open={isSelectOpen}
                onOpen={handleOpen}
                onClose={handleClose}
                label={label}
                error={fieldState.invalid}
                labelId={`${id}-label`}
                renderValue={() => (
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      justifyContent: "space-between",
                    }}>
                    {displayValue || (
                      <Typography color="textSecondary">
                        {placeholder}
                      </Typography>
                    )}
                  </Box>
                )}
                {...field}>
                {options.length === 0 ? (
                  <MenuItem>{placeholder}</MenuItem>
                ) : (
                  options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                )}
              </Select>
              <Box position="absolute" bottom="-24px">
                <FormHelperText error={fieldState.invalid}>
                  {fieldState.error?.message}
                </FormHelperText>
              </Box>
            </FormControl>
          );
        }}
      />
    </>
  );
};
