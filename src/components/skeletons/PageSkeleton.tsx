import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCardSkeleton, BlogCardSkeleton } from "./CardSkeleton";
import { TeamMemberSkeleton, StatSkeleton } from "./TeamSkeleton";

export const HeroSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-4xl">
        <Skeleton className="h-6 w-40 mx-auto rounded-full" />
        <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-5 w-2/3 mx-auto" />
        <div className="flex gap-4 justify-center pt-4">
          <Skeleton className="h-12 w-36 rounded-lg" />
          <Skeleton className="h-12 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const ProjectsGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const BlogGridSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const TeamGridSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[...Array(count)].map((_, i) => (
        <TeamMemberSkeleton key={i} />
      ))}
    </div>
  );
};

export const StatsRowSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[...Array(count)].map((_, i) => (
        <StatSkeleton key={i} />
      ))}
    </div>
  );
};

export const PageHeaderSkeleton = () => {
  return (
    <div className="text-center space-y-4 py-16">
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-5 w-96 max-w-full mx-auto" />
    </div>
  );
};
