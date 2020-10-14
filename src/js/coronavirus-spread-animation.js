// take all covid svg
const svgs = document.querySelectorAll(".c-bar-right__svg");

// covid-19 spread animation
const spread = (covidSvgs) => {
  const numberOfCovidSvgs = parseInt(covidSvgs.length, 10);

  for (let i = 0; i < numberOfCovidSvgs; ++i) {
    const RANDOMDURATION = (Math.random() * 0.5) + 0.9;
    const RANDOMYCORD = Math.floor(Math.random() * 100) - 100;
    const RANDOMXCORD = Math.floor(Math.random() * 100) - 100;
    const RANDOMSCALE = (Math.random() * 0.3) + 0.1;
    const RANDOMOPACITY = RANDOMSCALE;

    // randomized spread animation
    const { style } = covidSvgs[i];
    style.transitionDuration = `${RANDOMDURATION}s`;
    style.transitionDelay = `${RANDOMDURATION}s`;
    style.opacity = `${RANDOMOPACITY}`;
    style.transform =
      `translate(${RANDOMXCORD}%, ${RANDOMYCORD}%) scale(${RANDOMSCALE})`;
  }
}

spread(svgs);