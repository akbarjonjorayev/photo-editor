const appData = {
  loadTime: 0,
  newElSize: 300,
  move: false,
  shapes: {
    style: {
      backgroundColor: '#000',
    },
    shape: [
      {
        style: 'clip-path: none',
        name: 'Default',
      },
      {
        style: 'clip-path: inset(0 0 0 0 round var(--border-ra))',
        name: 'Square',
      },
      {
        style: 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%)',
        name: 'Triangle',
      },
      {
        style: 'clip-path: circle(50%)',
        name: 'Cricle',
      },
      {
        style:
          'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        name: 'Star',
      },
    ],
  },
  uploadNew: false,
  recentColors: [],
  maxIndex: 1,
  pixabayToken: '40874682-2915db56935d068f0cba5c8c7',
}

function getData() {
  return appData
}

export { getData }
