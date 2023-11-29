const appData = {
  loadTime: 0,
  newElSize: 300,
  move: false,
  shapes: {
    style: {
      backgroundColor: '#000',
    },
    shape: [
      { style: `clip-path: none`, name: `Default` },
      {
        style: `clip-path: polygon(50% 0%, 0% 100%, 100% 100%)`,
        name: `Triangle`,
      },
      {
        style: `clip-path: inset(0 0 0 0 round var(--border-ra))`,
        name: `Square`,
      },
      {
        style: `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
        name: `Rhombus`,
      },
      {
        style: `clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)`,
        name: `Parallelogram`,
      },
      {
        style: `clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)`,
        name: `Trapezoid`,
      },
      { style: `clip-path: circle(50%)`, name: `Circle` },
      {
        style: `clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`,
        name: `Star`,
      },
      {
        style: `clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)`,
        name: `Pentagon`,
      },
      {
        style: `clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`,
        name: `Hexagon`,
      },
      {
        style: `clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)`,
        name: `Heptagon`,
      },
      {
        style: `clip-path: polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 69% 100%, 31% 100%, 6% 78%, 0% 43%, 17% 12%)`,
        name: `Octagon`,
      },
      {
        style: `clip-path: polygon(50% 0%, 76% 10%, 100% 36%, 100% 64%, 76% 90%, 50% 100%, 24% 90%, 0% 64%, 0% 36%, 24% 10%)`,
        name: `Nonagon`,
      },
      {
        style: `clip-path: polygon(50% 0%, 70% 5%, 95% 25%, 100% 50%, 95% 75%, 70% 95%, 50% 100%, 30% 95%, 5% 75%, 0% 50%, 5% 25%, 30% 5%)`,
        name: `Decagon`,
      },
      {
        style: `clip-path: polygon(50% 0%, 100% 0%, 50% 100%, 0% 100%)`,
        name: `Kite`,
      },
    ],
  },
  uploadNew: false,
  recentColors: [],
  maxIndex: 1,
  token: {
    searchPhoto: `40874682-2915db56935d068f0cba5c8c7`, // pixabay
    screenshot: `ZDBDTAW-SW04GA0-J7JDRWG-4C5RHB5`, // screenshotapi
  },
}

function getData() {
  return appData
}

export { getData }
