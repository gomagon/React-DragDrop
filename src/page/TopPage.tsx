import { memo, FC } from "react";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";

import { TodoCardMain } from './TodoCardMain';
import { Header } from "./Header";
import { theme } from "../Theme";
import { useIsLoadingProvider } from "../hooks/useIsLoadingProvider";

export const TopPage: FC = memo(() => {
  const { useIsLoading } = useIsLoadingProvider();

  return (
      <div>
        <ChakraProvider theme={theme}>
          <Header />
            {useIsLoading ?
             (
                <Center mt={10}>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center>
              ) : (
                <TodoCardMain />
              )
            }
        </ChakraProvider>
      </div>
    );
})
