import { Button, Card, Group, Text, Title, Badge } from '@mantine/core';
import { Link } from 'react-router-dom';

export function LibraryPage() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Title order={2}>Библиотека ассетов</Title>
        <Badge color="blue">25 ассетов</Badge>
        <Button component={Link} to="/settings" fullWidth mt="md">
        Настройки
        </Button>
      </Group>

      <Text mb="md">Здесь будет грид с картинками.</Text>

      <Group>
        <Button>Загрузить</Button>
        <Button variant="light">Найти похожие</Button>
        <Button variant="subtle" color="red">
          Удалить
        </Button>
      </Group>
    </Card>
  );
}
