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

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  previewUrl?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, previewUrl, className, onChange, ...props }, ref) => {
    return (
      <div className="mb-6 w-full space-y-2">
        <label className="block text-base font-medium text-foreground">
          {label}
        </label>

        <div className="flex items-center gap-4">
          {previewUrl && (
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <img
                src={previewUrl}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <input
            type="file"
            ref={ref}
            onChange={onChange}
            className={cn(
              "file:mr-4 file:px-4 file:py-2",
              "file:rounded-full file:border-0",
              "file:text-sm file:font-semibold",
              "file:bg-primary file:text-primary-foreground",
              "hover:file:bg-primary/90",
              error && "text-destructive",
              className,
            )}
            accept="image/*"
            {...props}
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";
