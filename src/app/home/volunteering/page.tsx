'use client';

import VolunteeringSection from "../../../components/home/VolunteeringSection";
import { volunteering } from "../../../data/homePageData";

export default function VolunteeringPage() {
  return (
    <div className="container mx-auto py-8">
      <VolunteeringSection volunteering={volunteering} />
    </div>
  );
}
