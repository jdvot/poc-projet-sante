'use client';

import { useState } from 'react';
import {
  UnstyledButton,
  Group,
  Box,
  Collapse,
  rem,
  Badge,
  Tooltip,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../hooks/useAppTheme';
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  href?: string;
  badge?: string;
  badgeColor?: string;
  description?: string;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  href,
  badge,
  badgeColor = 'red',
  description,
}: LinksGroupProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { isDark, colors, transitions } = useAppTheme();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasLinks ? links : []).map((link) => {
    const isLinkActive = pathname === link.link;

    return (
      <Link
        className={`${classes.link} ${isLinkActive ? classes.active : ''}`}
        href={link.link}
        key={link.label}
        aria-current={isLinkActive ? 'page' : undefined}
        title={t(link.label)}
      >
        {t(link.label)}
        {isLinkActive && (
          <Box className={classes.activeIndicator} aria-hidden="true" />
        )}
      </Link>
    );
  });

  const isActive = href
    ? href === '/'
      ? pathname === '/'
      : pathname.startsWith(href)
    : false;

  const badgeStyles = {
    marginLeft: '0.75rem',
    fontSize: '0.7rem',
    fontWeight: 600,
    minWidth: 'auto',
    padding: '0.125rem 0.5rem',
    border: isDark
      ? '1px solid var(--mantine-color-dark-3)'
      : '1px solid var(--mantine-color-gray-3)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  if (hasLinks) {
    return (
      <>
        <Tooltip
          label={description}
          position="right"
          withArrow
          disabled={!description}
        >
          <UnstyledButton
            onClick={() => setOpened((o) => !o)}
            className={`${classes.control} ${isActive ? classes.active : ''}`}
            aria-expanded={opened}
            aria-controls={`submenu-${label}`}
            title={description}
          >
            <Group justify="space-between" gap={0}>
              <Box style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Icon
                  className={classes.icon}
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
                <Box ml="md" style={{ flex: 1 }}>
                  {t(label)}
                </Box>
                {badge && (
                  <Badge
                    size="sm"
                    variant="filled"
                    color={badgeColor}
                    style={badgeStyles}
                  >
                    {badge}
                  </Badge>
                )}
              </Box>
              <IconChevronRight
                className={`${classes.chevron} ${opened ? classes.chevronRotated : ''}`}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  marginLeft: '0.5rem',
                }}
              />
            </Group>
            {isActive && (
              <Box className={classes.activeIndicator} aria-hidden="true" />
            )}
          </UnstyledButton>
        </Tooltip>
        {hasLinks ? (
          <Collapse
            in={opened}
            id={`submenu-${label}`}
            role="menu"
            aria-label={`Sous-menu de ${t(label)}`}
          >
            {items}
          </Collapse>
        ) : null}
      </>
    );
  }

  return (
    <Tooltip
      label={description}
      position="right"
      withArrow
      disabled={!description}
    >
      <Link
        href={href || '#'}
        className={`${classes.control} ${isActive ? classes.active : ''}`}
        aria-current={isActive ? 'page' : undefined}
        title={description}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Icon
              className={classes.icon}
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
            <Box ml="md" style={{ flex: 1 }}>
              {t(label)}
            </Box>
            {badge && (
              <Badge
                size="sm"
                variant="filled"
                color={badgeColor}
                style={badgeStyles}
              >
                {badge}
              </Badge>
            )}
          </Box>
        </Group>
        {isActive && (
          <Box className={classes.activeIndicator} aria-hidden="true" />
        )}
      </Link>
    </Tooltip>
  );
}
