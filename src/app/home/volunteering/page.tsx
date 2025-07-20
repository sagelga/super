'use client';

import VolunteeringSection from "../../../components/home/VolunteeringSection";
import { getHomePageData } from "../../../data/homePageData";
import { useTranslations } from "next-intl";

export default function VolunteeringPage() {
  const t = useTranslations('home');
  const { volunteering } = getHomePageData(t);
  return (
    <div className="container mx-auto py-8">
      <VolunteeringSection volunteering={volunteering} />
    </div>
  );
}
