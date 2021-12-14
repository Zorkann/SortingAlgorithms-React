function generateRandomArray(arrayLength: number) {
  return Array.from(
    new Set(
      new Array(arrayLength)
        .fill(undefined)
        .map(() => Math.round(Math.random() * 100))
    )
  );
}

export { generateRandomArray };
