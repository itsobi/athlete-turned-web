import PageHeader from '@/components/PageHeader';

type Props = {
  params: { id: string };
  searchParams: { name: string };
};

export default function MentorPage({ params, searchParams }: Props) {
  return (
    <main className="main-container">
      <PageHeader title={searchParams.name} />
    </main>
  );
}
