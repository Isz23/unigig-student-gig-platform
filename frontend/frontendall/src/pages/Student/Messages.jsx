import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Send,
  Search,
  Paperclip,
  ShieldCheck,
  CheckCheck,
  ArrowLeft,
  Briefcase,
  Loader2,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import API from '../../api/axios';

export default function Messages() {
  const [searchParams] = useSearchParams();
  const queryPeerId = searchParams.get('peerId');

  // LocalStorage එකෙන් Login වී ඇති User ලබා ගැනීම
  const currentUser = (() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();

  const [conversations, setConversations] = useState([]);
  const [activePeer, setActivePeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1. Fetch Conversations List from Backend
  const fetchConversations = async () => {
    try {
      setLoadingConversations(true);
      const res = await API.get('/messages/conversations');
      if (res.data?.success) {
        const convList = res.data.data || [];
        setConversations(convList);

        if (convList.length > 0 && !activePeer && !queryPeerId) {
          setActivePeer(convList[0].user);
        }
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoadingConversations(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // 2. PeerId query parameter එකක් තිබේ නම් අදාළ peer එක තෝරා ගැනීම
  useEffect(() => {
    if (queryPeerId) {
      const matched = conversations.find(
        (c) => c.user?._id === queryPeerId || c.user?.id === queryPeerId
      );
      if (matched) {
        setActivePeer(matched.user);
      } else {
        setActivePeer({ _id: queryPeerId, name: 'Campus Peer', role: 'User' });
      }
    }
  }, [queryPeerId, conversations]);

  // 3. Fetch Chat Messages between Current User and Active Peer
  const fetchMessages = async (peerId) => {
    if (!peerId) return;
    try {
      setLoadingMessages(true);
      const res = await API.get(`/messages/chat/${peerId}`);
      if (res.data?.success) {
        setMessages(res.data.data || []);
      }
    } catch (err) {
      console.error('Error loading chat messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (activePeer?._id || activePeer?.id) {
      const peerId = activePeer._id || activePeer.id;
      fetchMessages(peerId);

      // Polling: තත්පර 4කට වරක් අලුත් messages පරීක්ෂා කිරීම
      const interval = setInterval(() => {
        fetchMessages(peerId);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [activePeer]);

  // 4. Send Message via Backend API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activePeer) return;

    const peerId = activePeer._id || activePeer.id;
    const textToSend = inputMessage.trim();

    try {
      setSending(true);
      const res = await API.post('/messages', {
        receiverId: peerId,
        text: textToSend,
      });

      if (res.data?.success) {
        setMessages((prev) => [...prev, res.data.data]);
        setInputMessage('');
        fetchConversations();
      }
    } catch (err) {
      console.error('Error sending message:', err);
      alert(err.response?.data?.message || 'Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const backLink =
    currentUser?.role === 'client' ? '/clientdashboard' : '/stddashboard';

  return (
    <div className="min-h-screen bg-gray-50/70 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">

        <div className="flex items-center justify-between">
          <Link
            to={backLink}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs overflow-hidden flex flex-col md:flex-row h-[780px]">
          
          {/* Chat List (Sidebar) */}
          <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col bg-white">
            
            <div className="p-4 border-b border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-extrabold text-gray-900">Chats</h1>
                <span className="text-[10px] font-bold text-[#007a4d] bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Escrow Protected
                </span>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or client..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-50/80 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 placeholder-gray-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-50 p-2 space-y-1">
              {loadingConversations ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2 text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin text-[#007a4d]" />
                  <span className="text-xs">Loading conversations...</span>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="py-12 px-4 text-center text-gray-400 space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto text-gray-300" />
                  <p className="text-xs font-semibold text-gray-600">No conversations yet</p>
                  <p className="text-[11px] text-gray-400">
                    Connect with students or clients from task requests to start messaging.
                  </p>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const peer = conv.user;
                  const isSelected =
                    (activePeer?._id || activePeer?.id) === (peer?._id || peer?.id);

                  return (
                    <button
                      key={peer?._id || peer?.id}
                      type="button"
                      onClick={() => setActivePeer(peer)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#eaf8f1] border border-emerald-100'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#007a4d] border border-emerald-100 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                        {peer?.name?.substring(0, 2) || 'UG'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-bold text-gray-900 truncate">
                            {peer?.name || 'Verified User'}
                          </h4>
                          {conv.lastMessageDate && (
                            <span className="text-[10px] text-gray-400 shrink-0">
                              {new Date(conv.lastMessageDate).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mb-1">
                          {conv.lastMessage || 'Start conversation...'}
                        </p>
                        <span className="text-[10px] font-semibold text-gray-400 capitalize">
                          {peer?.role || 'Peer'}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col bg-gray-50/40">
            {activePeer ? (
              <>
                <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007a4d] border border-emerald-100 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                      {activePeer.name?.substring(0, 2) || 'UG'}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                        <span>{activePeer.name}</span>
                        <span className="text-[10px] font-semibold text-[#007a4d] bg-[#eaf8f1] px-2 py-0.5 rounded-full border border-emerald-100 capitalize">
                          {activePeer.role || 'Member'}
                        </span>
                      </h3>
                      <p className="text-xs text-gray-400">{activePeer.email || 'Verified Campus Account'}</p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-[#007a4d]" />
                    <span>Verified Peer</span>
                  </div>
                </div>

                <div className="bg-[#eaf8f1]/70 border-b border-emerald-100 px-4 py-2 flex items-center justify-center gap-2 text-[11px] text-emerald-900 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d] shrink-0" />
                  <span>For university project security, always keep communication and deliverable links inside UniGig.</span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  {loadingMessages ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-2 text-gray-400">
                      <Loader2 className="w-6 h-6 animate-spin text-[#007a4d]" />
                      <span className="text-xs">Loading chat history...</span>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="py-20 text-center text-gray-400 space-y-2">
                      <MessageSquare className="w-10 h-10 mx-auto text-gray-300" />
                      <p className="text-xs font-semibold text-gray-600">No messages in this chat yet</p>
                      <p className="text-[11px] text-gray-400">Send a greeting message to start collaborating.</p>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const msgSenderId = msg.sender?._id || msg.sender;
                      const myId = currentUser?._id || currentUser?.id;
                      const isMe = msgSenderId?.toString() === myId?.toString();

                      const formattedTime = msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : '';

                      return (
                        <div
                          key={msg._id}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-md sm:max-w-lg p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                              isMe
                                ? 'bg-[#007a4d] text-white rounded-br-xs'
                                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs'
                            }`}
                          >
                            <p>{msg.text}</p>
                          </div>

                          <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-gray-400">
                            <span>{formattedTime}</span>
                            {isMe && (
                              <CheckCheck
                                className={`w-3.5 h-3.5 ${msg.read ? 'text-[#007a4d]' : 'text-gray-300'}`}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input Box */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <button
                      type="button"
                      title="Attach file"
                      className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors shrink-0 cursor-pointer"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      required
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={`Message ${activePeer.name?.split(' ')[0] || ''}...`}
                      className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 placeholder-gray-400 transition-colors"
                    />

                    <button
                      type="submit"
                      disabled={sending || !inputMessage.trim()}
                      className="px-4 py-2.5 bg-[#007a4d] hover:bg-[#00633e] disabled:bg-gray-300 text-white rounded-xl text-xs font-bold shadow-2xs transition-all active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 space-y-3">
                <MessageSquare className="w-12 h-12 text-gray-300" />
                <h3 className="text-sm font-bold text-gray-700">Select a Conversation</h3>
                <p className="text-xs text-gray-400 max-w-sm">
                  Choose a peer or client from the list on the left to review proposal discussions or project deliverables.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}