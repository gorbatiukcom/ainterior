"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackPageview } from "../constants/mixpanel";
import { theme } from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

export const NavigationEvents = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = useRef("");

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    if (currentUrl.current !== url) {
      currentUrl.current = url;
      // Mixpanel rounting events
      //Send track event when new pages is loaded
      trackPageview();
    }
  }, [pathname, searchParams]);

  return null;
};
