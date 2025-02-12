// src/components/common/Form/Input.tsx

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="mb-6 w-full space-y-2">
        <label className="block text-base font-medium text-foreground">
          {label}
        </label>
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
            "text-base ring-offset-background",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="mb-6 w-full space-y-2">
        <label className="block text-base font-medium text-foreground">
          {label}
        </label>
        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
            "text-base ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
          {...props}
        >
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
