import { create } from 'zustand';

type MessageType = 'error' | 'success' | 'info' | 'warning';

interface MessageState {
    message: string | Array<string> | null;
    type: MessageType | null;
    setMessage: (message: string | Array<string>, type: MessageType) => void;
    clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
    message: null,
    type: null,
    setMessage: (message, type) => set({ message, type }),
    clearMessage: () => set({ message: null, type: null }),
}));
