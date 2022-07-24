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
      <Options type={typeSelected} setTypeSelected={setTypeSelected}/>
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
