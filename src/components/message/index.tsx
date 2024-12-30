import { useMessageStore } from '@/store/useMessageStore';
import { useEffect, useState } from 'react';

const TYPE_BG_COLORS: Record<string, string> = {
    error: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    default: 'bg-gray-500',
};

const DISPLAY_DURATION = 1000 * 3;

const MessageToast = () => {
    const { message, type, clearMessage } = useMessageStore();
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                clearMessage();
            }, DISPLAY_DURATION);
            return () => clearTimeout(timer);
        }
    }, [message, clearMessage]);

    if (!message && !isVisible) return null;

    const displayMessage = Array.isArray(message) ? message[0] : message;
    const validType = type ?? 'default';
    const bgColor = TYPE_BG_COLORS[validType] || TYPE_BG_COLORS.default;

    return (
        <div
            className={`fixed top-0 left-1/2 transform -translate-x-1/2 text-white px-3 py-1 rounded shadow-lg z-50
            transition-all duration-300 ease-in-out ${bgColor}
            ${isVisible ? 'translate-y-4 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}
        >
            <p className="font-medium">{displayMessage}</p>
        </div>
    );
};

export default MessageToast;
