import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full flex transition-all duration-200">
      {/* Column 1: Workspace Navigation (Slim) */}
      <div className="w-16 flex flex-col items-center py-4 border-r border-base-content/5 bg-base-200/30 gap-4">
        <div className="relative group">
          <img
            src={authUser?.profilePic || "/avatar.png"}
            alt="Profile"
            className="size-10 rounded-md object-cover border border-base-content/10 group-hover:border-primary transition-colors cursor-pointer"
          />
          <div className="absolute -right-1 -bottom-1 size-3 bg-green-500 rounded-full border-2 border-base-100" />
        </div>
        
        <div className="w-8 h-[1px] bg-base-content/10 my-2" />
        
        <button className="size-10 rounded-md bg-base-content/5 flex items-center justify-center hover:bg-base-content/10 transition-colors">
          <Users className="size-5 opacity-70" />
        </button>
      </div>

      {/* Column 2: Contact List */}
      <div className="w-64 border-r border-base-content/5 flex flex-col h-full">
        <div className="p-5 border-b border-base-content/5">
          <h2 className="text-xs font-bold tracking-widest text-base-content/60 uppercase">
            Contacts
          </h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-base-content/40 uppercase tracking-wider">
              Recent
            </span>
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-xs"
              />
              <span className="text-[10px] uppercase tracking-wide opacity-60">Online Only</span>
            </label>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pt-2">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full px-4 py-3 flex items-center gap-3
                transition-all duration-200 group
                ${selectedUser?._id === user._id 
                  ? "bg-base-content/5 border-r-2 border-primary" 
                  : "hover:bg-base-content/5"}
              `}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-9 object-cover rounded-md border border-base-content/10"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute -right-0.5 -bottom-0.5 size-2.5 bg-green-500 rounded-full border-2 border-base-100" />
                )}
              </div>

              <div className="text-left min-w-0 flex-1">
                <div className={`text-sm font-medium truncate ${selectedUser?._id === user._id ? "text-primary" : "text-base-content"}`}>
                  {user.fullName}
                </div>
                <div className="text-[11px] text-base-content/40 font-medium tracking-tight">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-xs uppercase tracking-widest text-base-content/30 font-bold">
                No users found
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
