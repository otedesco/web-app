"use client";

import { useController, Control } from "react-hook-form";
import AvatarFileInput from "~/components/inputs/avatar-file-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface AvatarFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
}

const AvatarField = ({ control, name, label }: AvatarFieldProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <AvatarFileInput
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    onChange(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              avatarUrl={value}
              name={"avatar"}
              isEditMode={true}
            />
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default AvatarField;
