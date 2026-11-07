import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Search,
  Paperclip,
  ShieldCheck,
  CheckCheck,
  MoreVertical,
  ArrowLeft,
  Circle,
  Briefcase,
  ExternalLink,
  Smile
} from 'lucide-react';

export default function Messages() {
  // Current Logged-in User (Dulaksha - SEU/IS/22/ICT/047)
  const currentUser = {
    id: 'std-001',
    name: 'Dulaksha Nipun',
    role: 'Student Freelancer'
  };

  // Mock Conversations List
  const [conversations, setConversations] = useState([
    {
      id: 'CONV-101',
      peerId: 'client-001',
      peerName: 'Kavindu Perera',
      peerRole: 'Client • IEEE Student Branch (UoM)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      online: true,
      lastMessage: 'I reviewed the initial PR. Could you update the mobile navbar?',
      lastTime: '11:42 AM',
      unreadCount: 1,
      associatedOrder: {
        orderId: 'ORD-9477',
        title: 'Responsive React & Tailwind Web App',
        amount: 35
      },
      messages: [
        {
          id: 'MSG-001',
          senderId: 'client-001',
          text: 'Hi Dulaksha! I saw your proposal for the React landing page.',
          sentDate: '10:15 AM',
          status: 'read'
        },
        {
          id: 'MSG-002',
          senderId: 'std-001',
          text: 'Hello Kavindu! Yes, I have already set up Vite and Tailwind CSS. We can modularize all components cleanly.',
          sentDate: '10:18 AM',
          status: 'read'
        },
        {
          id: 'MSG-003',
          senderId: 'client-001',
          text: 'Awesome. Escrow is locked for ORD-9477. Let me know once the preview is deployed.',
          sentDate: '10:25 AM',
          status: 'read'
        },
        {
          id: 'MSG-004',
          senderId: 'std-001',
          text: 'I pushed the deliverable link to the Student Dashboard for your review!',
          sentDate: '11:20 AM',
          status: 'read'
        },
        {
          id: 'MSG-005',
          senderId: 'client-001',
          text: 'I reviewed the initial PR. Could you update the mobile navbar?',
          sentDate: '11:42 AM',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'CONV-102',
      peerId: 'std-002',
      peerName: 'Sanduni Fernando',
      peerRole: 'Peer Student • UoP',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      online: false,
      lastMessage: 'Thank you for the VLSM subnetting explanations!',
      lastTime: 'Yesterday',
      unreadCount: 0,
      associatedOrder: null,
      messages: [
        {
          id: 'MSG-101',
          senderId: 'std-002',
          text: 'Are you available for a 30-minute tutoring session on IPv4 VLSM today?',
          sentDate: 'Yesterday 3:00 PM',
          status: 'read'
        },
        {
          id: 'MSG-102',
          senderId: 'std-001',
          text: 'Sure! Let us connect over Google Meet around 5 PM.',
          sentDate: 'Yesterday 3:15 PM',
          status: 'read'
        },
        {
          id: 'MSG-103',
          senderId: 'std-002',
          text: 'Thank you for the VLSM subnetting explanations!',
          sentDate: 'Yesterday 6:00 PM',
          status: 'read'
        }
      ]
    }
  ]);

  const [activeConvId, setActiveConvId] = useState('CONV-101');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  // Active Selected Conversation
  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  // Send Message Handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `MSG-${Date.now()}`,
      senderId: currentUser.id,
      text: inputMessage.trim(),
      sentDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: newMsg.text,
            lastTime: newMsg.sentDate,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    setInputMessage('');
  };

  // Filtered Conversations List
  const filteredConversations = conversations.filter((c) =>
    c.peerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/70 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* Back Link */}
        <Link
          to="/stddashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Main Chat Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row h-[780px]">
          
          {/* ---------------- Left Sidebar: Conversations List ---------------- */}
          <div className="w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-white">
            
            {/* Sidebar Header & Search */}
            <div className="p-4 border-b border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-extrabold text-gray-900">Campus Chats</h1>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Escrow Protected
                </span>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or client..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
                />
              </div>
            </div>

            {/* Conversation Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50 p-2 space-y-1">
              {filteredConversations.map((conv) => {
                const isActive = conv.id === activeConvId;
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 ${
                      isActive
                        ? 'bg-emerald-50/70 border border-emerald-100'
                        : 'hover:bg-gray-50/80'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.avatar}
                        alt={conv.peerName}
                        className="w-11 h-11 rounded-xl object-cover"
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
              })}
            </div>
          </div>

          {/* ---------------- Right Panel: Active Chat Room ---------------- */}
          <div className="flex-1 flex flex-col bg-gray-50/40">
            
            {/* Chat Room Top Bar */}
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
                    <span className="text-[10px] font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {activeConv.online ? 'Online' : 'Offline'}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400">{activeConv.peerRole}</p>
                </div>
              </div>

              {/* Order Escrow Quick Widget */}
              {activeConv.associatedOrder && (
                <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200/80 px-3 py-1.5 rounded-xl text-xs">
                  <Briefcase className="w-3.5 h-3.5 text-[#007a4d]" />
                  <span className="font-bold text-gray-800">{activeConv.associatedOrder.orderId}</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-bold text-[#007a4d]">${activeConv.associatedOrder.amount} in Escrow</span>
                </div>
              )}
            </div>

            {/* Escrow Trust Alert Banner */}
            <div className="bg-emerald-50/80 border-b border-emerald-100/70 px-4 py-2 flex items-center justify-center gap-2 text-[11px] text-emerald-800 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>For university project security, always keep communication and deliverable links inside UniGig.</span>
            </div>

            {/* Messages Bubbles Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {activeConv.messages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md sm:max-w-lg p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
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
                        <CheckCheck className="w-3 h-3 text-emerald-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Form */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <button
                  type="button"
                  title="Attach file or code snippet"
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  required
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Message ${activeConv.peerName.split(' ')[0]}...`}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
                />

                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}