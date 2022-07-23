import { useState } from "react";

import { Box, HStack, Icon, useTheme, VStack } from "native-base";
import { Warning, Question, Wrench } from "phosphor-react-native";

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Options } from "../components/Options";

export function Register() {
  const [typeSelected, setTypeSelected] = useState<
    "problem" | "doubt" | "support"
  >("problem");
  const { colors } = useTheme();

  const colorType =
    typeSelected === "problem"
      ? colors.red[400]
      : typeSelected === "doubt"
      ? colors.orange[300]
      : colors.green[300];

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />
      <HStack
        mb={2}
        alignItems="center"
        justifyContent="space-around"
        rounded="sm"
        h={55}
      >
        <Options
          onPress={() => setTypeSelected("problem")}
          icon={
            <Icon
              as={
                <Warning
                  size={24}
                  color={
                    typeSelected === "problem" ? colorType : colors.gray[100]
                  }
                />
              }
            />
          }
          borderColor={typeSelected === "problem" ? colorType : "gray.300"}
          type="problem"
        />
        <Options
          onPress={() => setTypeSelected("doubt")}
          icon={
            <Icon
              as={
                <Question
                  size={24}
                  color={
                    typeSelected === "doubt" ? colorType : colors.gray[100]
                  }
                />
              }
            />
          }
          borderColor={typeSelected === "doubt" ? colorType : "gray.300"}
          type="doubt"
        />
        <Options
          onPress={() => setTypeSelected("support")}
          icon={
            <Icon
              as={
                <Wrench
                  size={24}
                  color={
                    typeSelected === "support" ? colorType : colors.gray[100]
                  }
                />
              }
            />
          }
          borderColor={typeSelected === "support" ? colorType : "gray.300"}
          type="support"
        />
      </HStack>
      <HStack
        mb={2}
        alignItems="center"
        justifyContent="space-around"
        rounded="sm"
        h={55}
      >
        <Box

          alignItems="center"
          p="2"
          _text={{
            fontSize: "lg",
            fontWeight: "bold",
            color: "white",
            letterSpacing: "lg",
          }}
        >
          {typeSelected === "problem"
            ? "Problema"
            : typeSelected === "doubt"
            ? "Dúvida"
            : "Suporte"}
        </Box>
      </HStack>
      <Input
        placeholder="Número do patrimônio"
        mt={4}
        _focus={{
          borderWidth: 1,
          borderColor: colorType,
          bg: "gray.700",
        }}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        _focus={{
          borderWidth: 1,
          borderColor: colorType,
          bg: "gray.700",
        }}
      />
      <Button title="Cadastrar" mt={5} />
    </VStack>
  );
}
