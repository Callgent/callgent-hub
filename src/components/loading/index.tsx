interface LoadingProps {
    message?: string;
    isLoading?: boolean;
}

const Loading = ({ message, isLoading = true }: LoadingProps) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-700 text-lg font-medium">
                {message || 'Loading...'}
            </p>
        </div>
    );
};

export default Loading;
