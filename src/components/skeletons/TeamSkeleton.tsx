import { Skeleton } from "@/components/ui/skeleton";

export const TeamMemberSkeleton = () => {
  return (
    <div className="text-center space-y-4">
      <Skeleton className="w-32 h-32 rounded-full mx-auto" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-32 mx-auto" />
        <Skeleton className="h-4 w-24 mx-auto" />
      </div>
      <div className="flex justify-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

export const TestimonialSkeleton = () => {
  return (
    <div className="rounded-2xl border border-border/30 bg-card/50 p-6 space-y-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-5" />
        ))}
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  );
};

export const StatSkeleton = () => {
  return (
    <div className="text-center space-y-2">
      <Skeleton className="h-12 w-20 mx-auto" />
      <Skeleton className="h-4 w-24 mx-auto" />
    </div>
  );
};
