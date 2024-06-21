export default function PageHeader({
  title,
  badgeComponent,
}: {
  title: string;
  badgeComponent?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold text-green-400">{title}</h1>
      {badgeComponent && badgeComponent}
    </div>
  );
}
