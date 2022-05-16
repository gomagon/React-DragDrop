import { Center } from "@chakra-ui/react";
import { memo, FC } from "react";

export const Header: FC = memo(() => {
  return (
    <Center fontWeight="bold" bg="gray.600" color="white" h="50">
      Todo Test　(React ver.17)
    </Center>
  );
});
