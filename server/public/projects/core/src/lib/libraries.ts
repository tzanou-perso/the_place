/* 
This file is used to let the core library know wich standalone libraries are available. for the main app
and let use them in the main app. 
As all the libraries mentionned here are standalone, they are not aware of each other.
*/

import { LibraryCore } from './core.store';

export const libraries: LibraryCore[] = [
  {
    path: '/mail',
    name: 'Mail',
    isSelected: true,
    icon: 'mail',
  },
  {
    path: '/search',
    name: 'Search',
    isSelected: false,
    icon: 'search',
  },
  {
    path: '/settings',
    name: 'Settings',
    isSelected: false,
    icon: 'settings',
  },
];
