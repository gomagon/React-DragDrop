import { Center } from "@chakra-ui/react";
import { memo, FC } from "react";

export const Header: FC = memo(() => {
  return (
    <Center fontWeight="bold" bg="gray.600" color="white" h="50">
      Drag and Drop test　(React ver.17, react-beautiful-dnd)
    </Center>
  );
});
