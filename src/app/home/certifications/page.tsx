'use client';

import CertificationsSection from "../../../components/home/CertificationsSection";
import { certifications } from "../../../data/homePageData";

export default function CertificationsPage() {
  return (
    <div className="container mx-auto py-8">
      <CertificationsSection certifications={certifications} />
    </div>
  );
}
