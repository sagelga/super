import i18n from '../utils/i18n';

export const getHomePageData = () => {
  const t = i18n.t;
  return {
    skills: t('home:skills', { returnObjects: true }) as string[],
    projects: t('home:projects', { returnObjects: true }) as any[],
    experiences: t('home:experiences', { returnObjects: true }) as any[],
    certifications: t('home:certifications', { returnObjects: true }) as any[],
    volunteering: t('home:volunteering', { returnObjects: true }) as any[],
    languages: t('home:languages', { returnObjects: true }) as any[],
    onlineProfiles: t('home:onlineProfiles', { returnObjects: true }) as any[],
  };
};
