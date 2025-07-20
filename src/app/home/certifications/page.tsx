'use client';

import CertificationsSection from "../../../components/home/CertificationsSection";
import { getHomePageData } from "../../../data/homePageData";
import { useTranslations } from "next-intl";

export default function CertificationsPage() {
  const t = useTranslations('home');
  const { certifications } = getHomePageData(t);
  return (
    <div className="container mx-auto py-8">
      <CertificationsSection certifications={certifications} />
    </div>
  );
}
