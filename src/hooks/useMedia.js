import React, { useLayoutEffect, useState } from "react";

const queries = [
  "(max-width: 767px)", // xs
  "(min-width: 768px) and (max-width: 1023px)", // sm
  "(min-width: 1024px) and (max-width: 1399px)", // md
  "(min-width: 1440px)" // lg
];

export function useMedia() {
  const mediaQLists = queries.map((q) => matchMedia(q));

  const getMedias = () => mediaQLists.map((mql) => mql.matches);

  const [medias, setMedias] = useState(getMedias);

  useLayoutEffect(() => {
    const handler = () => setMedias(getMedias);

    mediaQLists.forEach((mql) => mql.addEventListener("change", handler));

    return () =>
      mediaQLists.forEach((mql) => mql.removeEventListener("change", handler));
  }, []);

  return ["xs", "sm", "md", "lg"].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: medias[index],
    }),
    {}
  );
}