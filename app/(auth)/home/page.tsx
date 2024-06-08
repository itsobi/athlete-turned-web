import Feed from '@/components/Feed';
import PageHeader from '@/components/PageHeader';
import PostForm from '@/components/PostForm';

export default async function HomeScreenFeed() {
  return (
    <main className="main-container">
      <PageHeader title="Home" />
      <PostForm />
      <Feed />
    </main>
  );
}
