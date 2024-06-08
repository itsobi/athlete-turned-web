export default function PageHeader({ title }: { title: string }) {
  return (
    <h1 className="text-2xl font-semibold mb-4 text-green-400">{title}</h1>
  );
}
