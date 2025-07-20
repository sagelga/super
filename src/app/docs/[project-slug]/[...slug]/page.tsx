import { useTranslations } from 'next-intl';

// DocDetailPage component to display a single documentation page
export default function DocDetailPage() {
  const t = useTranslations('docs');
  return (
    <div>
      {/* Title of the documentation page */}
      <h1>{t('doc_detail_page_title')}</h1>
    </div>
  );
}
