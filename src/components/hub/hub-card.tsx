import React from 'react';
import { Hub } from '@/types/global';

const HubCard: React.FC<{ hub: Hub }> = ({ hub }) => {

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-lg p-4 shadow-sm border border-gray-200 dark:border-none transition-transform transform hover:shadow-lg dark:hover:shadow-xl cursor-pointer bg-white dark:bg-[#212121] flex flex-col h-52">
      <div className="flex items-center mb-4">
        <img
          src={hub.avatar || '/images/logo.svg'}
          alt="Avatar"
          className="w-12 h-12 rounded-full dark:border-gray-600 object-cover"
          loading="lazy"
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1">{hub.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {hub.category || 'category'}
          </p>
        </div>
      </div>
      <div className="flex-grow">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-3">
          {hub.description || 'No description provided'}
        </p>
      </div>
      <div className="mt-auto text-sm text-gray-400 dark:text-gray-500">
        <span>🕒 Updated on {formatDate(hub.updatedAt)}</span>
      </div>
    </div>
  );
};

export default HubCard;
