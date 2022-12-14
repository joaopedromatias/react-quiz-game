export const WrongIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 256 256'>
      <rect width='256' height='256' fill='none'></rect>
      <line
        x1='200'
        y1='56'
        x2='56'
        y2='200'
        stroke='var(--wrong)'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      ></line>
      <line
        x1='200'
        y1='200'
        x2='56'
        y2='56'
        stroke='var(--wrong)'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      ></line>
    </svg>
  );
};
