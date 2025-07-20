'use client';

import ExperienceSection from "../../../components/home/ExperienceSection";
import { getHomePageData } from "../../../data/homePageData";
import { useTranslations } from "next-intl";

export default function ExperiencePage() {
  const t = useTranslations('home');
  const { experiences } = getHomePageData(t);
  return (
    <div className="container mx-auto py-8">
      <ExperienceSection experiences={experiences} />
    </div>
  );
}
