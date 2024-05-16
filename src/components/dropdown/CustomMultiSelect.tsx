import React from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FormikProps } from "formik";

interface CustomMultiSelectProps {
  label: string;
  options: { id: string; name: string }[];
  value: string[];
  onChange: (selectedIds: string[]) => void;
  error?: boolean;
  formikData?: FormikProps<any>;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  error = false,
  formikData,
}) => {
  return (
    <FormControl size="small">
      <InputLabel error={error}>{label}</InputLabel>
      <Select
        size="small"
        multiple
        value={value}
        onChange={(e) => formikData!.setFieldValue("roleIds", e.target.value)}
        renderValue={(selected) => (
          <>
            {selected.map((item) => (
              <span key={item}>
                {`${options.find((option) => item === option.id)?.name}, `}
              </span>
            ))}
          </>
        )}
        input={<OutlinedInput label={label} />}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={value.includes(option.id)} />
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
      {error && <p className="form-error">Please select at least one role</p>}
    </FormControl>
  );
};

export default CustomMultiSelect;
