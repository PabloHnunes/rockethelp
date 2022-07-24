import { HStack, Icon, IconButton, useTheme } from "native-base";
import { Question, Warning, Wrench } from "phosphor-react-native";

type Props = {
  type: "problem" | "doubt" | "support";
  setTypeSelected: (t: "problem" | "doubt" | "support") =>  void;
};

export function Options({ type, setTypeSelected }: Props) {

  const { colors } = useTheme();

  const colorType =
    type === "problem"
      ? colors.red[400]
      : type === "doubt"
      ? colors.orange[300]
      : colors.green[300];

  function handleSetType(newType: "problem" | "doubt" | "support"){
    setTypeSelected(newType);
  }

  return (
    <HStack
      mb={2}
      alignItems="center"
      justifyContent="space-around"
      rounded="sm"
      h={55}
    >
      <IconButton
        bg="gray.500"
        borderRadius="full"
        borderWidth={0.5}
        onPress={() => handleSetType("problem")}
        icon={
          <Icon
            as={
              <Warning
                size={24}
                color={type === "problem" ? colorType : colors.gray[100]}
              />
            }
          />
        }
        borderColor={type === "problem" ? colorType : "gray.300"}
      />
      <IconButton
        bg="gray.500"
        borderRadius="full"
        borderWidth={0.5}
        onPress={() => handleSetType("doubt")}
        icon={
          <Icon
            as={
              <Question
                size={24}
                color={type === "doubt" ? colorType : colors.gray[100]}
              />
            }
          />
        }
        borderColor={type === "doubt" ? colorType : "gray.300"}
      />
      <IconButton
        bg="gray.500"
        borderRadius="full"
        borderWidth={0.5}
        onPress={() => handleSetType("support")}
        icon={
          <Icon
            as={
              <Wrench
                size={24}
                color={type === "support" ? colorType : colors.gray[100]}
              />
            }
          />
        }
        borderColor={type === "support" ? colorType : "gray.300"}
      />
    </HStack>
  );
}
