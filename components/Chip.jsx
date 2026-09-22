import React from 'react';

const Chip = ({ children, accent = false }) => (
  <span className={`chip ${accent ? 'chip-accent' : ''}`}>{children}</span>
);

export default Chip;
