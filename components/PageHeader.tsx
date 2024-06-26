import { cn } from '@/lib/utils';

export default function PageHeader({
  title,
  badgeComponent,
  error,
  subHeading,
}: {
  title: string;
  badgeComponent?: React.ReactNode;
  error?: boolean;
  subHeading?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-col">
        <h1
          className={cn(
            'text-2xl font-semibold text-green-400',
            error && 'text-red-500'
          )}
        >
          {title}
        </h1>
        {subHeading && (
          <h4 className="text-gray-400 font-light">{subHeading}</h4>
        )}
      </div>
      {badgeComponent && badgeComponent}
    </div>
  );
}
