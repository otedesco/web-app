type TimeOnUnit = "year" | "month" | "week" | "day";

export const timeOn = (date: Date): [TimeOnUnit, number] => {
  const currentDate = new Date();

  const timeDiffInSeconds = Math.floor(
    (currentDate.getTime() - date.getTime()) / 1000,
  );

  if (timeDiffInSeconds >= 60 * 60 * 24 * 365) {
    const years = Math.floor(timeDiffInSeconds / (60 * 60 * 24 * 365));
    return ["year", years];
  } else if (timeDiffInSeconds >= 60 * 60 * 24 * 30) {
    const months = Math.floor(timeDiffInSeconds / (60 * 60 * 24 * 30));
    return ["month", months];
  } else if (timeDiffInSeconds >= 60 * 60 * 24 * 7) {
    const weeks = Math.floor(timeDiffInSeconds / (60 * 60 * 24 * 7));
    return ["week", weeks];
  } else {
    const days = Math.floor(timeDiffInSeconds / (60 * 60 * 24));
    return ["day", days === 0 ? 1 : days];
  }
};
