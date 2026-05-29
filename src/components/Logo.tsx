/** The baomi wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`text-lg font-semibold tracking-tight ${className}`}>
      baomi<span className="text-orange-400">.app</span>
    </span>
  );
}
