import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories?.map((category) => (
        <button
          key={category?.id}
          onClick={() => onCategoryChange(category?.id)}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
            activeCategory === category?.id
              ? 'bg-primary text-primary-foreground shadow-brand'
              : 'bg-surface text-text-secondary hover:text-primary hover:bg-muted border border-border'
          }`}
        >
          <Icon name={category?.icon} size={16} />
          <span>{category?.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeCategory === category?.id
              ? 'bg-primary-foreground/20 text-primary-foreground'
              : 'bg-muted text-text-muted'
          }`}>
            {category?.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;