import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const metadata: Metadata = {
  title: "Library App",
  description: "Application to track books read by users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CssBaseline />
      <html lang="en">
        <body>
          <Box
            sx={{
              background:
                "linear-gradient(0deg, hsla(186, 33%, 94%, 1) 0%, hsla(195, 35%, 93%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)",
              width: "100%",
              minHeight: "100vh",
              margin: "0 auto",
            }}>
            {children}
          </Box>
        </body>
      </html>
    </>
  );
}
