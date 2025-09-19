import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectStats = ({ projects }) => {
  const totalProjects = projects?.length;
  const completedProjects = projects?.filter(p => p?.status === 'Completed')?.length;
  const dataAnalyticsProjects = projects?.filter(p => p?.category === 'Data Analytics')?.length;
  const webDevProjects = projects?.filter(p => p?.category === 'Web Development')?.length;
  const fullStackProjects = projects?.filter(p => p?.category === 'Full-Stack')?.length;
  
  const uniqueTechnologies = [...new Set(projects.flatMap(p => p.technologies))]?.length;
  const uniqueIndustries = [...new Set(projects.map(p => p.industry))]?.length;

  const stats = [
    {
      icon: 'FolderOpen',
      label: 'Total Projects',
      value: totalProjects,
      color: 'text-primary',
      bgColor: 'bg-primary bg-opacity-10'
    },
    {
      icon: 'CheckCircle',
      label: 'Completed',
      value: completedProjects,
      color: 'text-success',
      bgColor: 'bg-success bg-opacity-10'
    },
    {
      icon: 'BarChart3',
      label: 'Data Analytics',
      value: dataAnalyticsProjects,
      color: 'text-secondary',
      bgColor: 'bg-secondary bg-opacity-10'
    },
    {
      icon: 'Code',
      label: 'Web Development',
      value: webDevProjects,
      color: 'text-accent',
      bgColor: 'bg-accent bg-opacity-10'
    },
    {
      icon: 'Layers',
      label: 'Full-Stack',
      value: fullStackProjects,
      color: 'text-primary',
      bgColor: 'bg-primary bg-opacity-10'
    },
    {
      icon: 'Wrench',
      label: 'Technologies',
      value: uniqueTechnologies,
      color: 'text-text-primary',
      bgColor: 'bg-muted'
    },
    {
      icon: 'Building',
      label: 'Industries',
      value: uniqueIndustries,
      color: 'text-text-primary',
      bgColor: 'bg-muted'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className={`${stat?.bgColor} rounded-lg p-4 text-center hover-lift transition-all duration-300`}
        >
          <div className={`w-10 h-10 ${stat?.color} mx-auto mb-2 flex items-center justify-center`}>
            <Icon name={stat?.icon} size={20} />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {stat?.value}
          </div>
          <div className="text-xs text-text-secondary font-medium">
            {stat?.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;