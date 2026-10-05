import { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  PasswordInput,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth';
import { changePassword } from '../../../features/auth';

export function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  function handleLogout() {
    logout();
    navigate('/auth', { replace: true });
  }

  async function handleChangePassword() {
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!currentPassword) {
      setPasswordError('Введите текущий пароль');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Новый пароль — минимум 6 символов');
      return;
    }
    if (newPassword !== newPasswordRepeat) {
      setPasswordError('Пароли не совпадают');
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordRepeat('');
    } catch (err) {
      const response = (err as { response?: { status?: number } })?.response;
      if (response?.status === 400) {
        setPasswordError('Неверный текущий пароль');
      } else {
        setPasswordError('Не удалось сменить пароль');
      }
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">
        Настройки
      </Title>

      {/* Параметры поиска */}
      <Paper withBorder p="lg" radius="md" mb="xl">
        <Title order={3} mb="md">
          Параметры поиска
        </Title>
        <Stack>
          <NumberInput
            label="Размер топа"
            description="Сколько похожих показывать"
            defaultValue={5}
            min={1}
            max={50}
          />
          <Select
            label="Метрика похожести"
            defaultValue="cosine"
            data={[
              { value: 'cosine', label: 'Косинусное расстояние' },
              { value: 'euclidean', label: 'Евклидово расстояние' },
            ]}
          />
          <Group justify="flex-end">
            <Button disabled>Сохранить параметры</Button>
          </Group>
          <Text size="xs" c="dimmed">
            Сохранение настроек станет доступно позже.
          </Text>
        </Stack>
      </Paper>

      {/* Внешний вид */}
      <Paper withBorder p="lg" radius="md" mb="xl">
        <Title order={3} mb="md">
          Внешний вид
        </Title>
        <Stack>
          <div>
            <Text size="sm" fw={500} mb={4}>
              Тема
            </Text>
            <SegmentedControl
              fullWidth
              value={colorScheme}
              onChange={(value) =>
                setColorScheme(value as 'light' | 'dark' | 'auto')
              }
              data={[
                { value: 'light', label: 'Светлая' },
                { value: 'dark', label: 'Тёмная' },
                { value: 'auto', label: 'Авто' },
              ]}
            />
          </div>
        </Stack>
      </Paper>

      {/* Смена пароля */}
      <Paper withBorder p="lg" radius="md" mb="xl">
        <Title order={3} mb="md">
          Смена пароля
        </Title>
        <Stack>
          <PasswordInput
            label="Текущий пароль"
            placeholder="Введите текущий пароль"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.currentTarget.value)}
          />
          <PasswordInput
            label="Новый пароль"
            placeholder="Минимум 6 символов"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
          />
          <PasswordInput
            label="Повторите новый пароль"
            placeholder="Ещё раз"
            value={newPasswordRepeat}
            onChange={(e) => setNewPasswordRepeat(e.currentTarget.value)}
          />

          {passwordError && (
            <Alert color="red" title="Ошибка">
              {passwordError}
            </Alert>
          )}

          {passwordSuccess && (
            <Alert color="green" title="Успех">
              Пароль успешно изменён
            </Alert>
          )}

          <Group justify="flex-end">
            <Button onClick={handleChangePassword} loading={passwordLoading}>
              Сменить пароль
            </Button>
          </Group>
        </Stack>
      </Paper>

      {/* Опасная зона */}
      <Paper withBorder p="lg" radius="md">
        <Title order={3} mb="md" c="red">
          Опасная зона
        </Title>
        <Stack>
          <Text size="sm" c="dimmed">
            Выход завершит сессию на этом устройстве.
          </Text>
          <Group>
            <Button color="red" variant="light" onClick={handleLogout}>
              Выйти из аккаунта
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
