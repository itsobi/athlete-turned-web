import PageHeader from '@/components/PageHeader';

type User = {
  id: number;
  firstName: string;
  lastName: string;
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

const getUsers = async () => {
  const response = await fetch('https://dummyjson.com/users?limit=10');
  if (!response.ok) throw new Error('Failed to fetch users');

  return response.json();
};

export default async function MentorsPage() {
  const data = await getUsers();

  return (
    <main className="main-container">
      <PageHeader title="Mentors" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.users.map((user: User) => (
          <div key={user.id} className="p-4 bg-white shadow rounded-lg">
            <img
              src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />

            <div className="flex space-x-4 items-center justify-between mb-4">
              <h4 className="font-semibold">
                {user.firstName} {user.lastName}
              </h4>
              <p>{user.company.title}</p>
            </div>

            <p className="font-extralight">
              The mentor's short bio will go here
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
