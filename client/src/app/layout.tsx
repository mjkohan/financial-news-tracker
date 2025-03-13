

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap only the necessary subtree with client-side providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
