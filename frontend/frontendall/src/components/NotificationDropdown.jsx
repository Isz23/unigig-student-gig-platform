import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Briefcase,
  DollarSign,
  MessageSquare,
  Sparkles,
  FileCheck2,
  Clock,
  Loader2,
  Wallet
} from 'lucide-react';
import API from '../api/axios';

function formatTimeAgo(dateString) {
  if (!dateString) return 'Just now';
  const now = new Date();
  const past = new Date(dateString);
  const diffInSec = Math.floor((now - past) / 1000);

  if (diffInSec < 60) return 'Just now';
  const diffInMin = Math.floor(diffInSec / 60);
  if (diffInMin < 60) return `${diffInMin}m ago`;
  const diffInHours = Math.floor(diffInMin / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await API.get('/notifications');
      if (res.data?.success) {
        const list = res.data.notifications || res.data.data || [];
        setNotifications(list);

        const unread =
          res.data.unreadCount !== undefined
            ? res.data.unreadCount
            : list.filter((n) => !(n.read || n.isRead)).length;

        setUnreadCount(unread);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id, isRead) => {
    if (!isRead) {
      try {
        await API.put(`/notifications/${id}/read`);
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === id ? { ...n, read: true, isRead: true } : n
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error('Error marking read:', err);
      }
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await API.put('/notifications/read-all');
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleNotificationClick = (item) => {
    const isAlreadyRead = item.read !== undefined ? item.read : item.isRead;
    if (!isAlreadyRead) {
      handleMarkAsRead(item._id, false);
    }
    setIsOpen(false);

    let targetUrl = item.link;
    if (!targetUrl || targetUrl === '#') {
      if (item.type === 'message') {
        targetUrl = '/messages';
      } else {
        try {
          const stored = localStorage.getItem('user');
          const user = stored ? JSON.parse(stored) : null;
          targetUrl =
            user?.role === 'client' ? '/clientdashboard' : '/stddashboard';
        } catch {
          targetUrl = '/clientdashboard';
        }
      }
    }

    navigate(targetUrl);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'new_bid':
      case 'bid':
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'job':
        return <Briefcase className="w-4 h-4 text-indigo-600" />;
      case 'order_placed':
      case 'order':
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'order_delivered':
        return <FileCheck2 className="w-4 h-4 text-amber-500" />;
      case 'order_completed':
      case 'payment':
        return <DollarSign className="w-4 h-4 text-[#007a4d]" />;
      case 'wallet':
        return <Wallet className="w-4 h-4 text-[#007a4d]" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      case 'review':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchNotifications();
        }}
        className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
          isOpen
            ? 'text-[#007a4d] bg-[#eaf8f1]'
            : 'text-gray-600 hover:text-[#007a4d] hover:bg-gray-50'
        }`}
        title="Notifications"
        aria-label="View Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-[#007a4d] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 ring-2 ring-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-gray-100 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 font-sans">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold text-[#007a4d] bg-[#eaf8f1] px-2 py-0.5 rounded-full border border-emerald-100">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-[#007a4d] hover:text-[#00633e] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50 p-1.5 space-y-1">
            {notifications.length > 0 ? (
              notifications.map((item) => {
                const isItemRead =
                  item.read !== undefined ? item.read : item.isRead;

                return (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => handleNotificationClick(item)}
                    className={`w-full p-3 sm:p-3.5 rounded-2xl transition-all flex items-start gap-3 text-left cursor-pointer border ${
                      !isItemRead
                        ? 'bg-[#eaf8f1]/50 hover:bg-[#eaf8f1]/80 border-emerald-100/60'
                        : 'hover:bg-gray-50 border-transparent'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-2xs flex items-center justify-center shrink-0 mt-0.5">
                      {getIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {item.title}
                        </h4>
                        {!isItemRead && (
                          <span className="w-2 h-2 rounded-full bg-[#007a4d] shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1.5 font-medium">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{formatTimeAgo(item.createdAt)}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-10 text-center text-xs text-gray-400">
                No notifications right now.
              </div>
            )}
          </div>

          <div className="p-2.5 bg-gray-50 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400 font-medium">
              UniGig Alerts & Activity Feed
            </span>
          </div>
        </div>
      )}
    </div>
  );
}