import { MouseEvent } from 'react';

const ScrollToTopButton = () => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="scroll-to-top" type="button" onClick={handleClick} aria-label="Scroll to top">
      ↑
    </button>
  );
};

export default ScrollToTopButton;
