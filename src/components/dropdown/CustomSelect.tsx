import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface CustomSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: { id: string; name: string }[];
  error?: string;
  errorCondition?: boolean;
  size?: "small" | "medium";
  none?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  id,
  value,
  onChange,
  options,
  error,
  errorCondition,
  size,
  none,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`} className="mt-[-5px]">
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        size={size || "small"}
        value={value}
        label={label}
        onChange={onChange}
        error={errorCondition}
      >
        {none && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>

      <span className="text-sm font-light text-red-500">{error}</span>
    </FormControl>
  );
};

export default CustomSelect;
