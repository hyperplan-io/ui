import { Position, Toaster } from '@blueprintjs/core';

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = Toaster.create({
  className: 'custom-toaster',
  position: Position.TOP,
});
