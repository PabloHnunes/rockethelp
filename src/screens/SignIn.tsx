import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme } from "native-base";
import {
  Envelope,
  Key,
  SignIn as SingInIcon,
} from "phosphor-react-native";

import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Alert } from "react-native";


export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  function handleSingIn(){
    if(!email || !password){
        return Alert.alert("Entrar", "Informe e-mail e senha");
    }

    setIsLoading(true);

    auth()
    .signInWithEmailAndPassword(email,password)
    .then( response => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);

      if(error.code === 'auth/invalid-email'){
        return Alert.alert('Entrar', 'E-mail inválido.');
      }

      if(error.code === 'auth/user-not-found'){
        return Alert.alert('Entrar', 'E-mail ou senha inválida.');
      }

      if(error.code === 'auth/wrong-password'){
        return Alert.alert('Entrar', 'E-mail ou senha inválida.');
      }

      return Alert.alert("Entrar", "Não foi possivel acessar.");
    });

  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />

      <Input
        placeholder="Senha"
        secureTextEntry
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        onChangeText={setPassword}
      />

      <Button
        isLoadingText="Entrando..."
        isLoading={isLoading}
        title="Entrar"
        w="full"
        mb={8}
        rightIcon={
          <Icon as={<SingInIcon color={colors.white} size={24} />} ml={2} />
        }
        size="sm"
        onPress={handleSingIn}
      />

      {/* <Button title='Entrar com Google' bg ="blue.300" w="full" mb={2} leftIcon={<Icon as={<GoogleChromeLogo  color={colors.white} size={24} />} ml={2}/>}/>

            <Button title='Entrar com Git' w="full" bg ="blue.300" leftIcon={<Icon as={<GithubLogo color={colors.white} size={24} />} ml={2}/>}/> */}
    </VStack>
  );
}
