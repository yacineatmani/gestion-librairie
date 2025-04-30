import React from 'react';

interface PageHeaderProps {
  title: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actionButton }) => {
  return (
    <div className="bg-white shadow-sm px-4 py-5 border-b border-gray-200 sm:px-6 rounded-t-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {actionButton.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;