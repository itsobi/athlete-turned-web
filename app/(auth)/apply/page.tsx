import ApplyForm from '@/components/ApplyForm';
import PageHeader from '@/components/PageHeader';
import React from 'react';

export default function ApplyPage() {
  return (
    <main className="main-container">
      <PageHeader
        title="Apply"
        subHeading="Interested in becoming a mentor? Fill out the form below and we will get back to you within 24 hours."
      />
      <ApplyForm />
    </main>
  );
}
