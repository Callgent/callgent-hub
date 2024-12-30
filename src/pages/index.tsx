import React, { useCallback, useEffect, useState } from 'react';
import { getHubList } from '@/api/hub';
import useHubStore from '@/store/hub';
import HubCard from '@/components/hub/hub-card';
import HubSearch from '@/components/hub/hub-search';
import { Hub, RestApiResponse } from '@/types/global';
import Pagination from '@/components/hub/pagination';
import Loading from '@/components/loading';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { hublist, pagination, setHublist, setPagination } = useHubStore();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchHubs = useCallback(async () => {
    try {
      setLoading(true)
      const response: RestApiResponse<Array<Hub>> = await getHubList(pagination?.currentPage, searchTerm)
      if (response?.data) {
        setHublist(response.data)
        if (response?.meta) {
          setPagination({
            total: response.meta.total,
            lastPage: response.meta.lastPage,
            currentPage: response.meta.currentPage,
            perPage: response.meta.perPage,
            prev: response.meta.prev,
            next: response.meta.next,
          })
        }
      } else {
        console.warn('Unexpected API response format:', response)
      }
    } catch (error) {
      console.error('Failed to fetch hub list:', error)
    } finally {
      setLoading(false)
    }
  }, [pagination?.currentPage, searchTerm, setHublist, setPagination])

  useEffect(() => {
    fetchHubs();
  }, [pagination?.currentPage, searchTerm, fetchHubs])

  return (
    <div className="container mx-auto py-8 md:py-16">
      <div className='mt-2 mb-10'>

        <h2 className="text-3xl font-normal ml-4 mt-10 text-left">
          Find an Callgent Hub
        </h2>
        <h2 className='text-xs font-normal mt-2 ml-4 text-left w-full max-w-72 text-gray-400'>
          Discover Callgent Hubs for APIs, auth, and messaging solutions.
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 p-4 rounded-md">
          <HubSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <div className="hidden md:block">
            <div className="mt-4 my-4">Categories</div>
            <ul className="mb-4 text-sm">
              <li className="cursor-pointer hover:text-blue-500 my-2">API</li>
              <li className="cursor-pointer hover:text-blue-500 my-2">Auth</li>
              <li className="cursor-pointer hover:text-blue-500 my-2">Data Platform</li>
              <li className="cursor-pointer hover:text-blue-500 my-2">Messaging</li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div>
            {loading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(hublist) && hublist.length > 0 && (
                  hublist.map((hub: Hub) => (
                    <HubCard key={hub.id} hub={hub} />
                  ))
                )}
                <Loading message='No hubs available' isLoading={loading} />
              </div>
            )}
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default App;
