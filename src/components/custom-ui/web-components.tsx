"use client";

import { useEffect } from 'react';

export function WebComponents() {
  useEffect(() => {
    import('@govbr-ds/webcomponents/dist/webcomponents.common');
  }, []);

  return null;
}