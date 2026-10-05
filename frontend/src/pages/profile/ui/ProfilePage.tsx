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
import { useAuth } from '../../../features/auth';
import { useAssets } from '../../../features/assets';
import { formatBytes, formatLongDate, getInitials } from '../../../shared/lib';

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

  const totalBytes = assets.reduce((sum, a) => sum + a.size_bytes, 0);

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">
        Профиль
      </Title>

      {/* Шапка профиля */}
      <Paper withBorder p="lg" radius="md" mb="xl">
        <Group wrap="nowrap" align="flex-start">
          <Avatar size={80} radius="xl" color="blue">
            {getInitials(user.name)}
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
              С нами с {formatLongDate(user.created_at)}
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
            {formatBytes(totalBytes)}
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
