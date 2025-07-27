'use client';

import React from 'react';
import { Box, Stack, Transition, useMantineColorScheme } from '@mantine/core';
import { IconCheck, IconX, IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react';
import { useNotificationStore, Notification } from '../stores/notificationStore';

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRemove }) => {
  const { colorScheme } = useMantineColorScheme();

  const getNotificationStyles = () => {
    const baseStyles = {
      padding: '1rem',
      borderRadius: '0.75rem',
      border: '1px solid',
      boxShadow: colorScheme === 'dark' 
        ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
        : '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(16px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative' as const,
      overflow: 'hidden',
      minWidth: '320px',
      maxWidth: '400px',
    };

    switch (notification.type) {
      case 'success':
        return {
          ...baseStyles,
          background: colorScheme === 'dark' 
            ? 'rgba(34, 197, 94, 0.15)' 
            : 'rgba(34, 197, 94, 0.08)',
          borderColor: colorScheme === 'dark' 
            ? 'var(--mantine-color-green-6)' 
            : 'var(--mantine-color-green-4)',
          color: colorScheme === 'dark' 
            ? 'var(--mantine-color-green-0)' 
            : 'var(--mantine-color-green-8)',
        };
      case 'error':
        return {
          ...baseStyles,
          background: colorScheme === 'dark' 
            ? 'rgba(239, 68, 68, 0.15)' 
            : 'rgba(239, 68, 68, 0.08)',
          borderColor: colorScheme === 'dark' 
            ? 'var(--mantine-color-red-6)' 
            : 'var(--mantine-color-red-4)',
          color: colorScheme === 'dark' 
            ? 'var(--mantine-color-red-0)' 
            : 'var(--mantine-color-red-8)',
        };
      case 'warning':
        return {
          ...baseStyles,
          background: colorScheme === 'dark' 
            ? 'rgba(245, 158, 11, 0.15)' 
            : 'rgba(245, 158, 11, 0.08)',
          borderColor: colorScheme === 'dark' 
            ? 'var(--mantine-color-yellow-6)' 
            : 'var(--mantine-color-yellow-4)',
          color: colorScheme === 'dark' 
            ? 'var(--mantine-color-yellow-0)' 
            : 'var(--mantine-color-yellow-8)',
        };
      case 'info':
      default:
        return {
          ...baseStyles,
          background: colorScheme === 'dark' 
            ? 'rgba(59, 130, 246, 0.15)' 
            : 'rgba(59, 130, 246, 0.08)',
          borderColor: colorScheme === 'dark' 
            ? 'var(--mantine-color-blue-6)' 
            : 'var(--mantine-color-blue-4)',
          color: colorScheme === 'dark' 
            ? 'var(--mantine-color-blue-0)' 
            : 'var(--mantine-color-blue-8)',
        };
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <IconCheck size={20} />;
      case 'error':
        return <IconX size={20} />;
      case 'warning':
        return <IconAlertTriangle size={20} />;
      case 'info':
      default:
        return <IconInfoCircle size={20} />;
    }
  };

  const styles = getNotificationStyles();

  return (
    <Box
      style={styles}
      onClick={() => onRemove(notification.id)}
      className="hover:scale-105 hover:shadow-xl"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
        e.currentTarget.style.boxShadow = colorScheme === 'dark' 
          ? '0 12px 40px rgba(0, 0, 0, 0.5)' 
          : '0 12px 40px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0px)';
        e.currentTarget.style.boxShadow = styles.boxShadow;
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <Box 
          style={{ 
            flexShrink: 0, 
            marginTop: '0.125rem',
            padding: '0.5rem',
            borderRadius: '50%',
            background: colorScheme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {getIcon()}
        </Box>
        <Box style={{ flex: 1, minWidth: 0 }}>
          {notification.title && (
            <Box
              style={{
                fontWeight: 600,
                fontSize: '0.875rem',
                marginBottom: '0.25rem',
                color: styles.color,
              }}
            >
              {notification.title}
            </Box>
          )}
          <Box
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.4,
              color: styles.color,
              opacity: 0.9,
            }}
          >
            {notification.message}
          </Box>
        </Box>
        <Box
          style={{
            flexShrink: 0,
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%',
            opacity: 0.6,
            transition: 'all 0.2s ease',
            background: colorScheme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.05)',
          }}
          className="hover:opacity-100 hover:bg-opacity-20"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(notification.id);
          }}
        >
          <IconX size={16} />
        </Box>
      </Box>
    </Box>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 1000,
        maxWidth: '400px',
        width: '100%',
      }}
    >
      <Stack gap="sm">
        {notifications.map((notification) => (
          <Transition
            key={notification.id}
            mounted={true}
            transition="slide-up"
            duration={300}
            timingFunction="ease-out"
          >
            {(styles) => (
              <Box style={styles}>
                <NotificationItem
                  notification={notification}
                  onRemove={removeNotification}
                />
              </Box>
            )}
          </Transition>
        ))}
      </Stack>
    </Box>
  );
}; 