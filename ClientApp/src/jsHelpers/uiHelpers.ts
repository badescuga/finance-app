import { BaseTextFieldProps } from "@mui/material";
import { MutableRefObject } from "react";

export function convertToInt(
    compRef: MutableRefObject<BaseTextFieldProps | undefined>
  ): number {
    const value = compRef!.current!.value as string;
  
    if (value === "") {
      return 0;
    }
    return parseInt(value);
  }