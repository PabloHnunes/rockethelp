import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
  FlatList,
  Center,
} from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";

import Logo from "../assets/logo_secondary.svg";
import { dateFormat } from "../utils/firestoreDateFormat";

import { Filter } from "../components/Filter";
import { Button } from "../components/Button";
import { Order, OrdersPorps } from "../components/Order";
import { Options } from "../components/Options";
import { Loading } from "../components/Loading";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [typeSelected, setTypeSelected] = useState<
    "all" | "problem" | "doubt" | "support"
  >("all");
  const [orders, setOrders] = useState<OrdersPorps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  function handleLogaout() {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert("Sair", "Não foi possível sair.");
      });
  }

  useEffect(() => {
    setIsLoading(true);
    const subcribe = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .where("type", "in", typeSelected === "all" ? ["problem", "doubt", "support"] : [ typeSelected ])
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, type, status, created_at } = doc.data();
          return {
            id: doc.id,
            patrimony,
            description,
            type,
            status,
            when: dateFormat(created_at)
          };
        });
        setOrders(data);
        setIsLoading(false);
      });

    return subcribe;
  }, [statusSelected, typeSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogaout}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />

          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>
        <Options
          type={typeSelected}
          setTypeSelected={setTypeSelected}
          isFilter
        />
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {"\n"}
                  solicitações{" "}
                  {statusSelected === "open" ? "em aberto" : "finalizados"}
                </Text>
              </Center>
            )}
          />
        )}
        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
