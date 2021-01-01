import moment from "moment";

export const sortOccurence = (arr: string[]) => {
  return Object.entries(
    arr.reduce((obj, description) => {
      description.split(/\s|\.|,|;|\?|:|\/|\\/g).forEach((word) => {
        word = word.toLowerCase().replace(/[\W_]+/g, "");
        if (word) obj[word] = (obj[word] ?? 0) + 1;
      });
      return obj;
    }, {} as Record<string, number>)
  ).sort((one, two) => two[1] - one[1]);
};

export const createUnixDate = (date: string) => {
  return parseInt(moment(date, "DD-MM-YYYY").format("x"));
};
