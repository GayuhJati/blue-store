// components/ChatWidget.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import Pusher from "pusher-js";
import { useAuth } from "@/contexts/auth-context";
import { getEchoInstance } from "@/lib/echo";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [roomId, setRoomId] = useState("room-guest");

  useEffect(() => {
    const storedRoomId = localStorage.getItem("roomId");
    console.log("Stored Room ID:", storedRoomId);
    if (storedRoomId) {
      setRoomId(storedRoomId);
    } else if (user?.id) {
      const newRoomId = `room-${user.id}`;
      setRoomId(newRoomId);
      localStorage.setItem("roomId", newRoomId);
    } else {
      setRoomId("room-guest");
      localStorage.setItem("roomId", "room-guest");
    }
  }, [user?.id]);

  useEffect(() => {
    if (!roomId) return;
    fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    const echo = getEchoInstance();
    if (!echo) return;

    // Fetch old messages sesuai roomId
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages?room_id=${roomId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));

    // Tentukan apakah channel public atau private
    // "room-public" untuk guest dan chat publik
    const isPublicRoom = roomId === "room-guest";

    // Subscribe ke channel sesuai room type
    const channel = isPublicRoom
      ? echo.channel(`chat-room.${roomId}`)
      : echo.private(`chat-room.${roomId}`);

    channel.listen("MessageSent", (data: any) => {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      // Unsubscribe dari channel saat komponen unmount/roomId berubah
      if (isPublicRoom) {
        echo.leave(`chat-room.${roomId}`);
      } else {
        echo.leave(`chat-room.${roomId}`);
      }
    };
  }, [roomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: user ? user.name : "Anon",
            message,
            room_id: roomId,
          }),
        }
      );
      const data = await res.json();
      setMessages((prev) => [...prev, data]);
      if (!res.ok) {
        const error = await res.json();
        console.error("Gagal kirim pesan:", error);
        return;
      }

      setMessage("");
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen ? (
          <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
              <span className="font-semibold">Live Chat</span>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto text-sm space-y-2 max-h-80"
            >
              <div className="text-gray-500 text-center">
                {messages.map((m, i) => (
                  <div key={i} className="text-sm bg-gray-100 p-2 rounded-md">
                    <strong>{m.user?.name || m.name}</strong>: {m.message}
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!message.trim()) return;
                handleSubmit();
              }}
              className="flex border-t"
            >
              <input
                type="text"
                className="flex-1 px-4 py-2 outline-none text-sm"
                placeholder="Tulis pesan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 text-blue-600 hover:text-blue-800"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
          >
            💬
          </button>
        )}
      </div>
    </>
  );
}
