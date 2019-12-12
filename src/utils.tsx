import React from 'react';

export const safe = <T extends {}>(obj: T | null | undefined): T => {
  return obj ? (obj as T) : ({} as T);
};
