import { IconButton, IIconButtonProps, useTheme, Pressable, Icon } from "native-base";

type Props = IIconButtonProps & {
  type: "problem" | "doubt" | "support";
};

export function Options({ type, ...rest } : Props) {

  return (
    <>
      <IconButton
        bg="gray.500"
        borderRadius="full"
        borderWidth={0.5}
        {...rest}
      />
    </>
  );
}
