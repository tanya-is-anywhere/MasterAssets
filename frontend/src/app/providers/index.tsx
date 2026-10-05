import { MantineProvider } from '@mantine/core';
import { AuthProvider } from '../../features/auth';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <MantineProvider defaultColorScheme="auto">
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
}
