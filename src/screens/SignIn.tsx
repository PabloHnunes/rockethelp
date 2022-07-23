import { useState } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key, GithubLogo, GoogleChromeLogo, SignIn as SingInIcon  } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { colors } = useTheme();

    return(
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>

            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta 
            </Heading>

            <Input 
                placeholder="E-mail"
                mb={4}
                InputLeftElement={< Icon as={<Envelope color={colors.gray[300]} />} ml={4}/>}
                onChangeText={ setEmail }
            />

            <Input 
                placeholder="Senha"
                secureTextEntry
                mb={8}
                InputLeftElement={< Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
            />

            <Button title='Entrar' w="full" mb={8} rightIcon={<Icon as={<SingInIcon color={colors.white} size={24} />} ml={2}/>} size="sm" />

            {/* <Button title='Entrar com Google' bg ="blue.300" w="full" mb={2} leftIcon={<Icon as={<GoogleChromeLogo  color={colors.white} size={24} />} ml={2}/>}/>

            <Button title='Entrar com Git' w="full" bg ="blue.300" leftIcon={<Icon as={<GithubLogo color={colors.white} size={24} />} ml={2}/>}/> */}
        </VStack>
    )
}