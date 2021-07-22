import { GridOverlay } from '@material-ui/data-grid';
import React from 'react';

export default function SemItens() {
  return (
    <GridOverlay>
      <p data-testid="no-rows">Não há itens.</p>
    </GridOverlay>
  );
}
