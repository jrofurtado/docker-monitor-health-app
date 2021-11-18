import { OptionsObject, VariantType } from "notistack";

export const showSnackbar = (
  enqueueSnackbar: (
    message: React.ReactNode,
    options?: OptionsObject | undefined
  ) => React.ReactText
): ((
  message: string,
  type: VariantType,
  options?: OptionsObject | undefined
) => React.ReactText) => {
  return (
    message: string,
    type: VariantType,
    options?: OptionsObject | undefined
  ): React.ReactText => {
    return enqueueSnackbar(message, {
      variant: type,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      preventDuplicate: true,
      ...options,
    });
  };
};
