import {
  Container,
  Title,
  Paper,
  Group,
  Avatar,
  Text,
  Stack,
  TextInput,
  Button,
  SimpleGrid,
  Card,
  Divider,
  Badge,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAssets } from '../hooks/useAssets';

export function ProfilePage() {
  const { user } = useAuth();
  const { assets } = useAssets();

  if (!user) {
    return (
      <Container size="md" py="xl">
        <Text c="dimmed">Вы не залогинены.</Text>
      </Container>
    );
  }

  const totalBytes = assets.reduce((sum, a) => sum + a.sizeBytes, 0);
  const totalMb = (totalBytes / 1024 / 1024).toFixed(2);

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">
        Профиль
      </Title>

      {/* Шапка профиля */}
      <Paper withBorder p="lg" radius="md" mb="xl">
        <Group wrap="nowrap" align="flex-start">
          <Avatar size={80} radius="xl" color="blue">
            {user.name[0]?.toUpperCase() ?? '?'}
          </Avatar>

          <div style={{ flex: 1, minWidth: 0 }}>
            <Group justify="space-between" mb="xs">
              <div>
                <Text size="xl" fw={600}>
                  {user.name}
                </Text>
                <Text c="dimmed" size="sm">
                  {user.email}
                </Text>
              </div>
              <Badge variant="light" color="green">
                Активен
              </Badge>
            </Group>

            <Text size="xs" c="dimmed">
              С нами с{' '}
              {new Date(user.createdAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </div>
        </Group>
      </Paper>

      {/* Статистика */}
      <Title order={3} mb="sm">
        Статистика
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }} mb="xl">
        <Card withBorder padding="md">
          <Text size="sm" c="dimmed">
            Ассетов
          </Text>
          <Text size="xl" fw={700}>
            {assets.length}
          </Text>
        </Card>
        <Card withBorder padding="md">
          <Text size="sm" c="dimmed">
            Занято
          </Text>
          <Text size="xl" fw={700}>
            {totalMb} МБ
          </Text>
        </Card>
        <Card withBorder padding="md">
          <Text size="sm" c="dimmed">
            Тегов
          </Text>
          <Text size="xl" fw={700}>
            {new Set(assets.flatMap((a) => a.tags)).size}
          </Text>
        </Card>
      </SimpleGrid>

      {/* Контактные данные */}
      <Paper withBorder p="lg" radius="md" mb="xl">
        <Title order={3} mb="md">
          Контактные данные
        </Title>
        <Stack>
          <TextInput label="Имя" defaultValue={user.name} />
          <TextInput label="Email" defaultValue={user.email} />
          <Group justify="flex-end">
            <Button disabled>Сохранить</Button>
          </Group>
          <Text size="xs" c="dimmed">
            Редактирование станет доступно после подключения API.
          </Text>
        </Stack>
      </Paper>

      {/* Безопасность */}
      <Paper withBorder p="lg" radius="md">
        <Title order={3} mb="md">
          Безопасность
        </Title>
        <Stack>
          <Text size="sm" c="dimmed">
            Смена пароля доступна в настройках.
          </Text>
          <Divider />
          <Group>
            <Button component={Link} to="/settings" variant="light">
              Перейти в настройки
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
