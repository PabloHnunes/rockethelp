import { HStack, Icon, IconButton, useTheme } from "native-base";
import { Question, Warning, Wrench,TextAlignJustify } from "phosphor-react-native";

type Props = {
  isFilter?: boolean;
  type: "all" | "problem" | "doubt" | "support";
  setTypeSelected: (t: "all" | "problem" | "doubt" | "support") => void;
};

export function Options({ isFilter ,type, setTypeSelected }: Props) {
  const { colors } = useTheme();

  const colorType =
    type === "problem"
      ? colors.red[400]
      : type === "doubt"
      ? colors.orange[300] 
      : type === "support" 
      ? colors.green[300]
      : colors.purple[500];

  function handleSetType(newType: "all" | "problem" | "doubt" | "support") {
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
      { isFilter && 
        (<IconButton
          bg="gray.500"
          borderRadius="full"
          borderWidth={1}
          onPress={() => handleSetType("all")}
          icon={
            <Icon
              as={
                <TextAlignJustify
                  size={24}
                  color={ type === "all" ? colorType : colors.gray[100]}
                />
              }
            />
          }
          borderColor={ type === "all" ? colorType : colors.gray[100]}
        />)
      }
      <IconButton
        bg="gray.500"
        borderRadius="full"
        borderWidth={1}
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
        borderWidth={1}
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
        borderWidth={1}
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
