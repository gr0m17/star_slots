export const getRandomItem = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const winOrLose = (percentage) => {
  if (Math.random() * 100 <= percentage) {
    return true;
  }
  return false;
};

export const resolveGame = (slotArray, percentage, columns = 3) => {
  const randomImage = getRandomItem(slotArray);
  const resultsArray = (columns) => {
    const array = [];
    for (let i = 0; i < columns; i += 1) {
      array.push(randomImage);
    }
    return array;
  };
  if (winOrLose(percentage)) {
    return resultsArray(columns);
  }
  const filteredArray = slotArray.filter((item) => item !== randomImage);

  const resultsArrayLose = (columns) => {
    const array = [randomImage];
    for (let i = 0; i < columns - 1; i += 1) {
      array.push(getRandomItem(filteredArray));
    }
    return array;
  };
  return resultsArrayLose(columns);
};

export const evaluateWin = (params) => {
  return params.every((value) => value === params[0]);
};
