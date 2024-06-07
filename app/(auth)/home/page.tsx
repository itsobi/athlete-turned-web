import Feed from '@/components/Feed';
import PostForm from '@/components/PostForm';

export default async function HomeScreenFeed() {
  return (
    <main className="main-container">
      <PostForm />

      <Feed />
    </main>
  );
}
