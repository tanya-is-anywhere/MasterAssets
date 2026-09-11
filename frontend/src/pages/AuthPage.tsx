// src/pages/AuthPage.tsx
import { useState } from 'react';
import {
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Tabs,
  Stack,
  Center,
  Anchor,
  Text,
} from '@mantine/core';
import { Link } from 'react-router-dom';

export function AuthPage() {
  const [tab, setTab] = useState<string | null>('login');

  return (
    <Center mih="100vh" bg="var(--mantine-color-gray-0)">
      <Paper shadow="md" p="xl" radius="md" w={400} withBorder>
        <Title order={2} ta="center" mb="lg">
          Asset Similarity
        </Title>

        <Tabs value={tab} onChange={setTab}>
          <Tabs.List grow mb="md">
            <Tabs.Tab value="login">Вход</Tabs.Tab>
            <Tabs.Tab value="register">Регистрация</Tabs.Tab>
          </Tabs.List>

          {/* ВКЛАДКА: ВХОД */}
          <Tabs.Panel value="login">
            <Stack>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                type="email"
                required
              />
              <PasswordInput
                label="Пароль"
                placeholder="Введите пароль"
                required
              />
              <Button component={Link} to="/library" fullWidth mt="md">
                Войти
              </Button>
              <Text size="sm" ta="center" c="dimmed">
                Нет аккаунта?{' '}
                <Anchor
                  component="button"
                  type="button"
                  onClick={() => setTab('register')}
                >
                  Зарегистрироваться
                </Anchor>
              </Text>
            </Stack>
          </Tabs.Panel>

          {/* ВКЛАДКА: РЕГИСТРАЦИЯ */}
          <Tabs.Panel value="register">
            <Stack>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                type="email"
                required
              />
              <PasswordInput
                label="Пароль"
                placeholder="Минимум 8 символов"
                required
              />
              <PasswordInput
                label="Повторите пароль"
                placeholder="Ещё раз"
                required
              />
              <Button component={Link} to="/library" fullWidth mt="md">
                Зарегистрироваться
              </Button>

              <Text size="sm" ta="center" c="dimmed">
                Уже есть аккаунт?{' '}
                <Anchor
                  component="button"
                  type="button"
                  onClick={() => setTab('login')}
                >
                  Войти
                </Anchor>
              </Text>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Center>
  );
}
