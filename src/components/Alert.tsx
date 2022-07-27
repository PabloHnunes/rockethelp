import {
  Stack,
  Alert as NativeBaseAlert,
  IconButton,
  HStack,
  VStack,
  CloseIcon,
  Text,
  Center,
} from "native-base";

type Props = {
  status: string;
  title: string;
};

export function Alert({ status, title }: Props) {
  return (
    <Center>
      <Stack space={3} w="90%" maxW="400">
        <NativeBaseAlert w="100%" status={status}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <NativeBaseAlert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {title}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" color="coolGray.600" />}
              />
            </HStack>
          </VStack>
        </NativeBaseAlert>
      </Stack>
    </Center>
  );
}
