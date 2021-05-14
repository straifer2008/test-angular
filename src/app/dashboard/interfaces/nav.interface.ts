import { inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface NavInterfaceChildren {
  id: number;
  text: string;
  link?: string;
  callback?: (NavInterfaceItem?, NavInterfaceChildren?) => void;
}

export interface NavInterfaceItem {
  id: number;
  text: string;
  children: NavInterfaceChildren[];
}

export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  { factory: () => inject(DOCUMENT).defaultView }
);

export const NAVIGATOR = new InjectionToken<Navigator>(
  'An abstraction over window.navigator object',
  { factory: () => inject(WINDOW).navigator },
);
