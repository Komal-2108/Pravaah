import React from 'react';
import { Link } from 'react-router-dom';

export const SidebarItem = ({
  to,
  label,
  icon: Icon,
  active = false,
  onClick,
  className = ''
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-display text-sm transition-all select-none outline-none focus-visible:ring-2 focus-visible:ring-copper ${
        active
          ? 'bg-olive text-cream shadow-warm-pill font-extrabold'
          : 'text-forest hover:bg-sand/40 hover:text-forest font-bold'
      } ${className}`}
    >
      {Icon && (
        <Icon
          size={18}
          className={`shrink-0 transition-colors ${active ? 'text-cream' : 'text-forest'}`}
        />
      )}
      <span className="truncate">{label}</span>
    </Link>
  );
};
