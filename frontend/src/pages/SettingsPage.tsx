import {
  Container,
  Title,
  Paper,
  Stack,
  Button,
  Group,
  NumberInput,
  Select,
  Text,
  Divider,
  SegmentedControl,
  TextInput,
  PasswordInput,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/auth', { replace: true });
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
            Сохранение настроек станет доступно после подключения API.
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
              defaultValue="auto"
              data={[
                { value: 'light', label: 'Светлая' },
                { value: 'dark', label: 'Тёмная' },
                { value: 'auto', label: 'Авто' },
              ]}
            />
          </div>
          <Text size="xs" c="dimmed">
            Переключение темы станет доступно после подключения к Mantine
            ColorScheme.
          </Text>
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
          />
          <PasswordInput
            label="Новый пароль"
            placeholder="Минимум 6 символов"
          />
          <PasswordInput
            label="Повторите новый пароль"
            placeholder="Ещё раз"
          />
          <Group justify="flex-end">
            <Button disabled>Сменить пароль</Button>
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