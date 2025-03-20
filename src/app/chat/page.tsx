"use client";

import { useEffect, useRef, useState } from "react";

interface ChatMessage {
	text: string;
	isSent: boolean;
	from: string;
	to?: string;
}

export default function ChatPage() {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [userId, setUserId] = useState<string | null>(null);
	const [recipientId, setRecipientId] = useState("");
	const socketRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const connectWebSocket = async () => {
			await fetch("/api/ws"); // WebSocket 서버 초기화
			const ws = new WebSocket("ws://localhost:3001");

			ws.onopen = () => {
				console.log("WebSocket connection established");
			};

			ws.onmessage = (event) => {
				const data = JSON.parse(event.data);
				if (data.type === "id") {
					setUserId(data.id);
				} else if (data.type === "private" || data.type === "broadcast") {
					setMessages((prevMessages) => [
						...prevMessages,
						{
							text: data.message,
							isSent: false,
							from: data.from
						}
					]);
				}
			};

			ws.onerror = (error) => {
				console.error("WebSocket error:", error);
			};

			ws.onclose = () => {
				console.log("WebSocket connection closed");
			};

			socketRef.current = ws;
		};

		connectWebSocket();

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
		};
	}, []);

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (message && socketRef.current && userId) {
			const messageData = recipientId
				? { type: "private", from: userId, to: recipientId, message }
				: { type: "broadcast", from: userId, message };

			socketRef.current.send(JSON.stringify(messageData));
			setMessages((prevMessages) => [
				...prevMessages,
				{
					text: message,
					isSent: true,
					from: userId,
					to: recipientId || "all"
				}
			]);
			setMessage("");
		}
	};

	return (
		<div className="flex h-screen flex-col bg-gray-100">
			<div className="flex items-center justify-between bg-blue-500 p-4 text-white">
				<h1 className="text-xl font-bold">Chat App</h1>
				{userId && (
					<div className="rounded bg-blue-600 px-3 py-1">
						Your ID: <span className="font-bold">{userId}</span>
					</div>
				)}
			</div>
			<div className="flex-1 overflow-y-auto p-4">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`mb-2 rounded-lg p-2 ${
							msg.isSent ? "self-end bg-blue-500 text-white" : "self-start bg-white text-gray-800"
						}`}
					>
						<div className="font-bold">{msg.isSent ? "You" : msg.from}</div>
						<div>{msg.text}</div>
						{msg.to && <div className="text-xs">{msg.isSent ? `To: ${msg.to}` : ""}</div>}
					</div>
				))}
			</div>
			<form onSubmit={sendMessage} className="border-t bg-white p-4">
				<div className="mb-2 flex">
					<input
						type="text"
						value={recipientId}
						onChange={(e) => setRecipientId(e.target.value)}
						className="flex-1 rounded-l border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="Recipient ID (leave empty for broadcast)"
					/>
				</div>
				<div className="flex">
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="flex-1 rounded-l border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="Type a message..."
					/>
					<button
						type="submit"
						className="rounded-r bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
}
