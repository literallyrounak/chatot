import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="px-6 py-4 border-b border-base-content/5 bg-base-100/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName} 
              className="size-10 rounded-md object-cover border border-base-content/10"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute -right-1 -bottom-1 size-3 bg-green-500 rounded-full border-2 border-base-100" />
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-bold text-sm tracking-tight">{selectedUser.fullName}</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/40 mt-0.5">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Action button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-2 hover:bg-base-content/5 rounded-md transition-colors opacity-50 hover:opacity-100"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
