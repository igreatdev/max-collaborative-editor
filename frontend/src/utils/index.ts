export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(Number(value));
};

export const formatWithBr = (value: string): string => {
  return value.replace(/\n/g, '<br />');
};
