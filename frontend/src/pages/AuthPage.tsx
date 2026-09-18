import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Alert,
} from '@mantine/core';
import { useAuth } from '../context/AuthContext';

export function AuthPage() {
  const [tab, setTab] = useState<string | null>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/library', { replace: true });
    }
  }, [user, navigate]);

  function resetForm() {
    setEmail('');
    setPassword('');
    setPasswordRepeat('');
    setError(null);
  }

  function switchTab(next: string | null) {
    setTab(next);
    resetForm();
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Введите email');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }

    try {
      await login(email, password);
      navigate('/library', { replace: true });
    } catch {
      setError('Не удалось войти');
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Введите email');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }
    if (password !== passwordRepeat) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await login(email, password);
      navigate('/library', { replace: true });
    } catch {
      setError('Не удалось зарегистрироваться');
    }
  }

  return (
    <Center mih="100vh" bg="var(--mantine-color-gray-0)">
      <Paper shadow="md" p="xl" radius="md" w={400} withBorder>
        <Title order={2} ta="center" mb="lg">
          Asset Similarity
        </Title>

        <Tabs value={tab} onChange={switchTab}>
          <Tabs.List grow mb="md">
            <Tabs.Tab value="login">Вход</Tabs.Tab>
            <Tabs.Tab value="register">Регистрация</Tabs.Tab>
          </Tabs.List>

          {error && (
            <Alert color="red" mb="md" title="Ошибка">
              {error}
            </Alert>
          )}

          <Tabs.Panel value="login">
            <form onSubmit={handleLogin}>
              <Stack>
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                />
                <PasswordInput
                  label="Пароль"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required
                />
                <Button type="submit" fullWidth mt="md" loading={loading}>
                  Войти
                </Button>
                <Text size="sm" ta="center" c="dimmed">
                  Нет аккаунта?{' '}
                  <Anchor
                    component="button"
                    type="button"
                    onClick={() => switchTab('register')}
                  >
                    Зарегистрироваться
                  </Anchor>
                </Text>
              </Stack>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="register">
            <form onSubmit={handleRegister}>
              <Stack>
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                />
                <PasswordInput
                  label="Пароль"
                  placeholder="Минимум 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required
                />
                <PasswordInput
                  label="Повторите пароль"
                  placeholder="Ещё раз"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.currentTarget.value)}
                  required
                />
                <Button type="submit" fullWidth mt="md" loading={loading}>
                  Зарегистрироваться
                </Button>
                <Text size="sm" ta="center" c="dimmed">
                  Уже есть аккаунт?{' '}
                  <Anchor
                    component="button"
                    type="button"
                    onClick={() => switchTab('login')}
                  >
                    Войти
                  </Anchor>
                </Text>
              </Stack>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Center>
  );
}