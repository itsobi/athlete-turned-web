export default function LoadingContainer({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-green-400 animate-bounce" />
      {text && <p className="mt-4 font-semibold animate-pulse">{text}</p>}
    </div>
  );
}
