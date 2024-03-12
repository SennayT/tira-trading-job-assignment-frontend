'use client';

import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, AppShell, Button } from '@mantine/core';
import Link from 'next/link';
import { theme } from '../theme';
import { StoreProvider } from './StoreProvider';

// export const metadata = {
//   title: 'Mantine Next.js template',
//   description: 'I am using Mantine with Next.js!',
// };

export default function RootLayout({ children }: { children: any }) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
        </head>
        <body>
          <MantineProvider theme={theme}>
            <AppShell header={{ height: 60 }} padding="md">
              <AppShell.Header>
                <Link href="/" passHref>
                  <Button mr={20}>Home</Button>
                </Link>
                <Link href="/department/add" passHref>
                  <Button>Add</Button>
                </Link>
              </AppShell.Header>

              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          </MantineProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
