import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Group,
  Button,
  Text,
  Menu,
  Avatar,
  UnstyledButton,
  Box,
} from '@mantine/core';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/library', label: 'Библиотека' },
  { to: '/upload', label: 'Загрузить' },
  { to: '/profile', label: 'Профиль' },
  { to: '/settings', label: 'Настройки' },
];

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate('/auth');
  }

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Text fw={700} size="lg">
          Asset Similarity
        </Text>

        <Group gap="xs" ml="xl">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                variant={active ? 'light' : 'subtle'}
                size="sm"
              >
                {item.label}
              </Button>
            );
          })}
        </Group>
      </Group>

      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <UnstyledButton>
            <Group gap="xs">
              <Avatar size="sm" radius="xl" color="blue">
                {user?.name?.[0]?.toUpperCase() ?? '?'}
              </Avatar>
              <Box>
                <Text size="sm" fw={500}>
                  {user?.name ?? 'Гость'}
                </Text>
              </Box>
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>{user?.email ?? 'не залогинен'}</Menu.Label>
          <Menu.Item component={Link} to="/profile">
            Профиль
          </Menu.Item>
          <Menu.Item component={Link} to="/settings">
            Настройки
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" onClick={handleLogout}>
            Выйти
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
