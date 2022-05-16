import { extendTheme } from "@chakra-ui/react";
import backgroundimg from "./wallpaper1.jpg";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundImage: `url(${backgroundimg})`,
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
    },
  },
});
