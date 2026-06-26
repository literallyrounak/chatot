import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-4">
        {/* Icon Display */}
        <div className="flex justify-center mb-8">
          <div className="size-16 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
            <MessageSquare className="size-8 text-primary opacity-80" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-xl font-bold tracking-tight text-base-content">Select a conversation</h2>
        <p className="text-sm font-medium text-base-content/40 tracking-wide uppercase">
          Choose a contact from the panel to start a secure real-time message stream
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
