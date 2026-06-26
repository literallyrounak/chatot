import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200/50">
      <div className="flex items-center justify-center pt-20 px-4 h-full pb-8">
        <div className="bg-base-100 border border-base-content/10 w-full max-w-7xl h-full overflow-hidden rounded-xl">
          <div className="flex h-full">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
