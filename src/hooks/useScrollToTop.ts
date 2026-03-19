/**
 * Custom hook that provides a scroll-to-top function
 * @param behavior - Scroll behavior ('auto' or 'smooth', default: 'smooth')
 * @returns Function to scroll to top of page
 */
export function useScrollToTop(behavior: ScrollBehavior = 'smooth'): () => void {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  };

  return scrollToTop;
}
