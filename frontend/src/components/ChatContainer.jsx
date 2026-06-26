import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-base-100 overflow-hidden">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
        {messages.map((message, idx) => {
          const isCurrentUser = message.senderId === authUser._id;
          const prevMessage = messages[idx - 1];
          const isSameUser = prevMessage && prevMessage.senderId === message.senderId;
          const timeDiff = prevMessage && (new Date(message.createdAt) - new Date(prevMessage.createdAt)) < 60000;
          const shouldGroup = isSameUser && timeDiff;

          return (
            <div
              key={message._id}
              className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} ${shouldGroup ? "-mt-4" : ""}`}
              ref={messageEndRef}
            >
              {!shouldGroup && (
                <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-[11px] font-bold tracking-wider text-base-content/40 uppercase">
                    {isCurrentUser ? "You" : selectedUser.fullName}
                  </span>
                  <span className="text-[10px] text-base-content/20 font-medium">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              )}

              <div className={`flex gap-3 max-w-[80%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                {!shouldGroup ? (
                  <img
                    src={isCurrentUser ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                    alt="avatar"
                    className="size-8 rounded-md object-cover border border-base-content/10 flex-shrink-0 mt-1"
                  />
                ) : (
                  <div className="w-8 flex-shrink-0" />
                )}

                <div
                  className={`
                    px-4 py-3 rounded-2xl text-sm leading-relaxed
                    ${isCurrentUser 
                      ? "bg-primary text-primary-content rounded-tr-none" 
                      : "bg-base-200 text-base-content rounded-tl-none border border-base-content/5"}
                    ${shouldGroup ? (isCurrentUser ? "rounded-tr-2xl" : "rounded-tl-2xl") : ""}
                  `}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-full rounded-lg mb-2 border border-base-content/10"
                    />
                  )}
                  {message.text && <p className="font-medium">{message.text}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
