import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Send,
  Search,
  Paperclip,
  ShieldCheck,
  CheckCheck,
  ArrowLeft,
  Briefcase,
  Smile,
  Circle,
  Loader2
} from 'lucide-react';
import API from '../../api/axios';

export default function Messages() {
  const [searchParams] = useSearchParams();
  const queryPeerId = searchParams.get('peerId');

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [conversations, setConversations] = useState(() => {
    try {
      const cached = localStorage.getItem('unigig_conversations');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [activeConvId, setActiveConvId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [loadingPeer, setLoadingPeer] = useState(false);

  // Initialize and load dynamic peer from queryPeerId
  useEffect(() => {
    const initPeerConversation = async () => {
      if (!queryPeerId) return;

      // Check if conversation already exists for this peerId
      const existingConv = conversations.find(
        (c) => c.peerId === queryPeerId || c.id === queryPeerId
      );

      if (existingConv) {
        setActiveConvId(existingConv.id);
        return;
      }

      // If not exists, fetch real user details from Backend
      try {
        setLoadingPeer(true);
        const res = await API.get(`/auth/user/${queryPeerId}`);
        if (res.data?.success && res.data?.user) {
          const peer = res.data.user;

          // Check for any active orders with this peer
          let associatedOrder = null;
          try {
            const ordersRes = await API.get('/orders/seller-orders');
            if (ordersRes.data?.success && Array.isArray(ordersRes.data.data)) {
              const matchedOrder = ordersRes.data.data.find(
                (o) => (o.buyer?._id || o.buyer?.id || o.buyer) === queryPeerId
              );
              if (matchedOrder) {
                associatedOrder = {
                  orderId: `ORD-${matchedOrder._id.slice(-4).toUpperCase()}`,
                  title: matchedOrder.gig?.title || 'Campus Gig',
                  amount: matchedOrder.price
                };
              }
            }
          } catch (err) {
            console.warn('Could not check orders for chat:', err);
          }

          const newConv = {
            id: `conv_${peer._id}`,
            peerId: peer._id,
            peerName: peer.name || 'Campus Peer',
            peerRole: `${peer.role === 'client' ? 'Client' : 'Student'} • ${peer.university || 'Campus'}`,
            avatar: peer.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${peer.name}`,
            online: true,
            lastMessage: 'Conversation opened',
            lastTime: 'Just now',
            unreadCount: 0,
            associatedOrder,
            messages: [
              {
                id: `msg_welcome_${Date.now()}`,
                senderId: peer._id,
                text: `Hello! I'm ${peer.name}. You can discuss task requirements and send project updates directly here.`,
                sentDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'read'
              }
            ]
          };

          setConversations((prev) => {
            const updated = [newConv, ...prev.filter((c) => c.peerId !== peer._id)];
            localStorage.setItem('unigig_conversations', JSON.stringify(updated));
            return updated;
          });

          setActiveConvId(newConv.id);
        }
      } catch (err) {
        console.error('Failed to load chat peer:', err);
      } finally {
        setLoadingPeer(false);
      }
    };

    initPeerConversation();
  }, [queryPeerId]);

  // Set default active conversation if none active
  useEffect(() => {
    if (!activeConvId && conversations.length > 0) {
      setActiveConvId(conversations[0].id);
    }
  }, [conversations, activeConvId]);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;

    const myId = currentUser?._id || currentUser?.id || 'me';

    const newMsg = {
      id: `MSG-${Date.now()}`,
      senderId: myId,
      text: inputMessage.trim(),
      sentDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const updatedConversations = conversations.map((c) => {
      if (c.id === activeConv.id) {
        return {
          ...c,
          lastMessage: newMsg.text,
          lastTime: newMsg.sentDate,
          messages: [...(c.messages || []), newMsg]
        };
      }
      return c;
    });

    setConversations(updatedConversations);
    localStorage.setItem('unigig_conversations', JSON.stringify(updatedConversations));
    setInputMessage('');
  };

  const filteredConversations = conversations.filter((c) =>
    c.peerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/70 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">

        <div className="flex items-center justify-between">
          <Link
            to={currentUser?.role === 'client' ? '/client-dashboard' : '/stddashboard'}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Direct Campus Communication</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs overflow-hidden flex flex-col md:flex-row h-[780px]">
          
          {/* Left Conversations Sidebar */}
          <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col bg-white">
            
            <div className="p-4 border-b border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-extrabold text-gray-900">Campus Chats</h1>
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
              {loadingPeer && (
                <div className="p-4 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#007a4d]" />
                  <span>Connecting to peer...</span>
                </div>
              )}

              {filteredConversations.length === 0 && !loadingPeer ? (
                <div className="p-6 text-center text-xs text-gray-400">
                  No chat conversations yet. Click "Chat" from your tasks dashboard to message a client or peer.
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const isActive = conv.id === activeConvId;
                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => setActiveConvId(conv.id)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                        isActive
                          ? 'bg-[#eaf8f1] border border-emerald-100'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={conv.avatar}
                          alt={conv.peerName}
                          className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-100"
                        />
                        {conv.online && (
                          <span className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white absolute -bottom-0.5 -right-0.5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-bold text-gray-900 truncate">
                            {conv.peerName}
                          </h4>
                          <span className="text-[10px] text-gray-400 shrink-0">
                            {conv.lastTime}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mb-1">
                          {conv.lastMessage}
                        </p>
                        <div className="flex items-center gap-1.5">
                          {conv.associatedOrder && (
                            <span className="text-[9px] font-mono font-bold text-[#007a4d] bg-white border border-emerald-100 px-1.5 py-0.5 rounded">
                              {conv.associatedOrder.orderId}
                            </span>
                          )}
                          <span className="text-[10px] text-gray-400 truncate">
                            {conv.peerRole}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Active Chat Window */}
          {activeConv ? (
            <div className="flex-1 flex flex-col bg-gray-50/40">
              <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={activeConv.avatar}
                      alt={activeConv.peerName}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#007a4d]/10"
                    />
                    {activeConv.online && (
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white absolute -bottom-0.5 -right-0.5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      <span>{activeConv.peerName}</span>
                      <span className="text-[10px] font-semibold text-[#007a4d] bg-[#eaf8f1] px-2 py-0.5 rounded-full border border-emerald-100">
                        {activeConv.online ? 'Online' : 'Offline'}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-400">{activeConv.peerRole}</p>
                  </div>
                </div>

                {activeConv.associatedOrder && (
                  <div className="hidden sm:flex items-center gap-2 bg-[#eaf8f1]/60 border border-emerald-100 px-3 py-1.5 rounded-xl text-xs">
                    <Briefcase className="w-3.5 h-3.5 text-[#007a4d]" />
                    <span className="font-bold text-gray-800">{activeConv.associatedOrder.orderId}</span>
                    <span className="text-emerald-300">•</span>
                    <span className="font-black text-[#007a4d]">${activeConv.associatedOrder.amount} in Escrow</span>
                  </div>
                )}
              </div>

              <div className="bg-[#eaf8f1]/70 border-b border-emerald-100 px-4 py-2 flex items-center justify-center gap-2 text-[11px] text-emerald-900 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d] shrink-0" />
                <span>For university project security, always keep communication and deliverable links inside UniGig.</span>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {(activeConv.messages || []).map((msg) => {
                  const myId = currentUser?._id || currentUser?.id || 'me';
                  const isMe = msg.senderId === myId;
                  return (
                    <div
                      key={msg.id}
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
                        <span>{msg.sentDate}</span>
                        {isMe && (
                          <CheckCheck className="w-3.5 h-3.5 text-[#007a4d]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Box */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <button
                    type="button"
                    title="Attach file or code snippet"
                    className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors shrink-0 cursor-pointer"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    required
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Message ${activeConv.peerName.split(' ')[0]}...`}
                    className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 placeholder-gray-400 transition-colors"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold shadow-2xs transition-all active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8 text-gray-400 text-xs">
              Select a conversation to start chatting
            </div>
          )}

        </div>

      </div>
    </div>
  );
}