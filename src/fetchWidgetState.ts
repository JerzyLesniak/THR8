export const fetchWidgetState = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        brightness: 20, // %
        timeLeft: 12, // h
        nightVision: false,
        duskTillDawn: true,
        flashing: true,
      });
    }, 2000);
  });
