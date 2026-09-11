// src/pages/SettingsPage.tsx
import {
  Container,
  Title,
  Paper,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Divider,
  NumberInput,
  Select,
  SimpleGrid,
  Card,
  Text,
} from '@mantine/core';
import { Link } from 'react-router-dom';
export function SettingsPage() {
  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">
        Настройки
      </Title>
      <Button component={Link} to="/library" fullWidth mt="md">
      Вернуться в каталог
      </Button>

      {/* СТАТИСТИКА */}
      <Title order={3} mb="sm">
        Статистика
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }} mb="xl">
        <Card withBorder padding="md">
          <Text size="sm" c="dimmed">
            Ассетов
          </Text>
          <Text size="xl" fw={700}>
            1 234
          </Text>
        </Card>
        <Card withBorder padding="md">
          <Text size="sm" c="dimmed">
            Занято
          </Text>
          <Text size="xl" fw={700}>
            2.4 GB
          </Text>
        </Card>
        <Card withBorder padding="md">
          <Text size="sm" c="dimmed">
            Тегов
          </Text>
          <Text size="xl" fw={700}>
            87
          </Text>
        </Card>
      </SimpleGrid>

      {/* ПРОФИЛЬ */}
      <Paper withBorder p="lg" radius="md" mb="xl">
        <Title order={3} mb="md">
          Профиль
        </Title>
        <Stack>
          <TextInput
            label="Email"
            defaultValue="user@example.com"
          />
          <Group justify="flex-end">
            <Button>Сохранить email</Button>
          </Group>
        </Stack>
      </Paper>

      {/* ПАРОЛЬ */}
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
            placeholder="Минимум 8 символов"
          />
          <PasswordInput
            label="Повторите новый пароль"
            placeholder="Ещё раз"
          />
          <Group justify="flex-end">
            <Button>Сменить пароль</Button>
          </Group>
        </Stack>
      </Paper>

      {/* ПАРАМЕТРЫ ПОИСКА */}
      <Paper withBorder p="lg" radius="md" mb="xl">
        <Title order={3} mb="md">
          Параметры поиска
        </Title>
        <Stack>
          <NumberInput
            label="Размер топа (сколько похожих показывать)"
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
            <Button>Сохранить параметры</Button>
          </Group>
        </Stack>
      </Paper>

      {/* ОПАСНАЯ ЗОНА */}
      <Paper withBorder p="lg" radius="md">
        <Title order={3} mb="md" c="red">
          Опасная зона
        </Title>
        <Stack>
          <Text size="sm" c="dimmed">
            Выход из аккаунта завершит текущую сессию на этом устройстве.
          </Text>
          <Group>
            <Button component={Link} to="/auth" color="red" variant="light">
              Выйти из аккаунта
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
