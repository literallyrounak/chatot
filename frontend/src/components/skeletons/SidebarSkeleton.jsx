import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full flex w-full lg:w-auto transition-all duration-200">
      {/* Column 1: Workspace Navigation Skeleton */}
      <div className="w-14 sm:w-16 flex flex-col items-center py-4 border-r border-base-content/5 bg-base-200/30 gap-4 flex-shrink-0">
        <div className="skeleton size-9 sm:size-10 rounded-md" />
        <div className="w-6 sm:w-8 h-[1px] skeleton my-2" />
        <div className="skeleton size-9 sm:size-10 rounded-md" />
      </div>

      {/* Column 2: Contact List Skeleton */}
      <div className="flex-1 lg:w-64 border-r border-base-content/5 flex flex-col h-full bg-base-100/50">
        <div className="p-4 sm:p-5 border-b border-base-content/5">
          <div className="skeleton h-3 w-16 mb-4" />
          <div className="flex items-center justify-between">
            <div className="skeleton h-2 w-10" />
            <div className="skeleton h-2 w-16" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {skeletonContacts.map((_, idx) => (
            <div key={idx} className="w-full px-4 py-3 flex items-center gap-3">
              <div className="skeleton size-9 rounded-md flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="skeleton h-3 w-24 mb-2" />
                <div className="skeleton h-2 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
