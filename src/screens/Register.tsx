import { useState } from "react";
import { Box, HStack, useTheme, VStack } from "native-base";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Options } from "../components/Options";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"all" | "problem" | "doubt" | "support">(
    "problem"
  );
  const { colors } = useTheme();

  const colorType =
    type === "problem"
      ? colors.red[400]
      : type === "doubt"
      ? colors.orange[300]
      : colors.green[300];

  const navegation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos.");
    }
    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        type,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navegation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possivel registrar o pedido."
        );
      });
  }
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />
      <Options type={type} setTypeSelected={setType} />
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
          {type === "problem"
            ? "Problema"
            : type === "doubt"
            ? "Dúvida"
            : "Suporte"}
        </Box>
      </HStack>
      <Input
        onChangeText={setPatrimony}
        placeholder="Número do patrimônio"
        mt={4}
        _focus={{
          borderWidth: 1,
          borderColor: colorType,
          bg: "gray.700",
        }}
      />
      <Input
        onChangeText={setDescription}
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
      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        isLoadingText="Enviando solicitação..."
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
