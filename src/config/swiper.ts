import { Navigation, Pagination, A11y } from 'swiper/modules';

/**
 * Default Swiper configuration for carousel components
 */
export const defaultSwiperConfig = {
  modules: [Navigation, Pagination, A11y],
  spaceBetween: 30,
  slidesPerView: 1,
  navigation: true,
  pagination: { clickable: true },
};

/**
 * Responsive Swiper configuration
 * Returns different slidesPerView based on screen size
 */
export const responsiveSwiperConfig = {
  ...defaultSwiperConfig,
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
};
