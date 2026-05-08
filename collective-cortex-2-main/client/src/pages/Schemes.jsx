import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Map, Building, FileBadge, ArrowRight } from 'lucide-react';

const Schemes = () => {
  const schemes = [
    {
      id: 'pmay',
      title: 'PMAY Housing Scheme',
      description: 'Apply for government subsidy for housing construction or purchase.',
      icon: <HomeIcon className="w-6 h-6" />,
      color: 'blue'
    },
    {
      id: 'mutation',
      title: 'Land Mutation / Property Transfer',
      description: 'Transfer ownership of property in local municipal records.',
      icon: <Map className="w-6 h-6" />,
      color: 'green'
    },
    {
      id: 'building',
      title: 'Building Approval Process',
      description: 'Get clearance for new building construction plans.',
      icon: <Building className="w-6 h-6" />,
      color: 'purple'
    },
    {
      id: 'hakku-patra',
      title: 'Hakku Patra (Land Ownership)',
      description: 'Apply for official title deed for unrecorded property.',
      icon: <FileBadge className="w-6 h-6" />,
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-400 hover:shadow-blue-100';
      case 'green': return 'bg-green-50 text-green-600 border-green-200 hover:border-green-400 hover:shadow-green-100';
      case 'purple': return 'bg-purple-50 text-purple-600 border-purple-200 hover:border-purple-400 hover:shadow-purple-100';
      case 'orange': return 'bg-orange-50 text-orange-600 border-orange-200 hover:border-orange-400 hover:shadow-orange-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400';
    }
  };

  const getIconBgClass = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-100';
      case 'green': return 'bg-green-100';
      case 'purple': return 'bg-purple-100';
      case 'orange': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Available Schemes</h1>
        <p className="text-sm text-gray-500 mt-1">Select a scheme to start your application process.</p>
      </div>

      <div className="flex flex-col gap-4">
        {schemes.map((scheme) => (
          <div key={scheme.id} className={`bg-white rounded-2xl p-5 border-2 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col ${getColorClasses(scheme.color)}`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${getIconBgClass(scheme.color)}`}>
                {scheme.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{scheme.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{scheme.description}</p>
              </div>
            </div>
            
            <div className="mt-5 flex justify-end">
              <Link to={`/workflow/${scheme.id}`} className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 text-white bg-primary hover:bg-blue-600 transition shadow-sm`}>
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;
