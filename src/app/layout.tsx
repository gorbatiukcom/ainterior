import { ColorModeScript } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Viewport } from "next";
import Script from "next/script";

import { Header } from "@/components/header/header";

import { fonts } from "./fonts";
import { NavigationEvents, Providers } from "./providers";
import { theme } from "./theme";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Admiral Interior",
  description: "Admiral Interior — Nowoczesne podejście do aranżacji wnętrz",
  metadataBase: new URL("https://admiralinterior.com"),
  openGraph: {
    description: "Admiral Interior — Nowoczesne podejście do aranżacji wnętrz",
    images: ["https://admiralinterior.com/images/bg-image.png"],
  },
  twitter: {
    images: ["https://admiralinterior.com/images/bg-image.png"],
  },
};

const isProd = process.env.NODE_ENV === "production";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={fonts.oswald.className}>
      <head>
        {/* typeof window != "undefined" && !(window as any).mixpanel  */}
        {isProd ? (
          <Script
            strategy="afterInteractive"
            id="mix"
            dangerouslySetInnerHTML={{
              __html: `
                  const MIXPANEL_PROJECT_TOKEN = "f53bdecef75be95913b1b93e17b77435";
                  
                  (function (f, b) { if (!b.__SV) { var e, g, i, h; window.mixpanel = b; b._i = []; b.init = function (e, f, c) { function g(a, d) { var b = d.split("."); 2 == b.length && ((a = a[b[0]]), (d = b[1])); a[d] = function () { a.push([d].concat(Array.prototype.slice.call(arguments, 0))); }; } var a = b; "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel"); a.people = a.people || []; a.toString = function (a) { var d = "mixpanel"; "mixpanel" !== c && (d += "." + c); a || (d += " (stub)"); return d; }; a.people.toString = function () { return a.toString(1) + ".people (stub)"; }; i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split( " "); for (h = 0; h < i.length; h++) g(a, i[h]); var j = "set set_once union unset remove delete".split(" "); a.get_group = function () { function b(c) { d[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); a.push([e, call2]); }; } for ( var d = {}, e = ["get_group"].concat( Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]); return d; }; b._i.push([e, f, c]); }; b.__SV = 1.2; e = f.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === f.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; g = f.getElementsByTagName("script")[0]; g.parentNode.insertBefore(e, g); } })(document, window.mixpanel || []);
                
                  mixpanel.init(MIXPANEL_PROJECT_TOKEN, {debug: false, persistence: 'localStorage'});          
                  mixpanel.track_pageview();
                `,
            }}
          />
        ) : null}
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Header>{children}</Header>
          <NavigationEvents />
        </Providers>
      </body>
    </html>
  );
}
