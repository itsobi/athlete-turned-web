import BadgeComponent from '@/components/BadgeComponent';
import MentorCard from '@/components/MentorCard';
import PageHeader from '@/components/PageHeader';
import mentors from '@/mentors.json';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export type Mentor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  bio: string;
  address: {
    city: string;
    state: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
  };
};

export type UserObj = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  image: string;
};

export default async function MentorsPage() {
  const user = await currentUser();
  const isMentor = user?.publicMetadata?.isMentor as boolean;
  if (!user) redirect('/');
  if (isMentor) redirect('/home');

  const userObj: UserObj = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0].emailAddress,
    image: user.imageUrl,
  };

  return (
    <main className="main-container">
      <PageHeader title="Mentors" badgeComponent={<BadgeComponent />} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.users.map((mentor: Mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} user={userObj} />
        ))}
      </div>
    </main>
  );
}
