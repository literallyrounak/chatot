import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 py-4 w-full bg-base-100 border-t border-base-content/5">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 object-cover rounded-md border border-base-content/10 transition-all group-hover:opacity-90"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 size-6 rounded-full bg-base-100 border border-base-content/10
              flex items-center justify-center hover:bg-base-200 transition-colors"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2 bg-base-200/50 rounded-lg px-4 py-1.5 border border-base-content/5 focus-within:border-primary/30 transition-all">
          <button
            type="button"
            className={`flex items-center justify-center p-2 rounded-md transition-colors
                     ${imagePreview ? "text-primary bg-primary/10" : "text-base-content/40 hover:text-base-content/60 hover:bg-base-content/5"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={18} />
          </button>
          
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 placeholder:text-base-content/30 font-medium tracking-tight"
            placeholder="Write your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className={`
            size-10 flex items-center justify-center rounded-lg transition-all
            ${(text.trim() || imagePreview) 
              ? "bg-primary text-primary-content shadow-sm hover:opacity-90" 
              : "bg-base-content/5 text-base-content/20 cursor-not-allowed"}
          `}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
