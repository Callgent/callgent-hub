import React from 'react';

interface HubSearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const HubSearch: React.FC<HubSearchProps> = ({ searchTerm, onSearchChange }) => {

    return (
        <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </span>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 py-1 text-gray-700 dark:text-gray-300 bg-transparent border-[0.5px] border-gray-300 dark:border-gray-500 rounded-md outline-none transition-all focus:ring-1 text-sm"
            />
        </div>
    );
};

export default HubSearch;
