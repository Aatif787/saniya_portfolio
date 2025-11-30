import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsLabSection = () => {
  const [activeDemo, setActiveDemo] = useState('visualization');
  const [chartData, setChartData] = useState([
    { month: 'Jan', sales: 4000, target: 3500 },
    { month: 'Feb', sales: 3000, target: 3200 },
    { month: 'Mar', sales: 5000, target: 4000 },
    { month: 'Apr', sales: 4500, target: 4200 },
    { month: 'May', sales: 6000, target: 5000 },
    { month: 'Jun', sales: 5500, target: 5200 }
  ]);

  const skillDemos = [
    {
      id: 'visualization',
      title: 'Data Visualization',
      description: 'Interactive charts that tell compelling stories',
      icon: 'BarChart3',
      color: 'bg-primary'
    },
    {
      id: 'analysis',
      title: 'Statistical Analysis',
      description: 'Advanced analytics and pattern recognition',
      icon: 'TrendingUp',
      color: 'bg-secondary'
    },
    {
      id: 'development',
      title: 'Full-Stack Development',
      description: 'Modern web applications with clean architecture',
      icon: 'Code',
      color: 'bg-accent'
    }
  ];

  const codeExamples = {
    python: `# Data Analysis Example
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load and prepare data
df = pd.read_csv('sales_data.csv')
X = df[['marketing_spend', 'season', 'competition']]
y = df['sales']

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, y_train)

# Generate insights
feature_importance = model.feature_importances_
print(f"Marketing impact: {feature_importance[0]:.2%}")`,
    
    react: `// Interactive Dashboard Component
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const SalesDashboard = ({ data }) => {
  const [insights, setInsights] = useState({});
  
  useEffect(() => {
    // Calculate key metrics
    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    const avgGrowth = calculateGrowthRate(data);
    const topPerformer = data.reduce((max, item) => 
      item.sales > max.sales ? item : max
    );
    
    setInsights({ totalSales, avgGrowth, topPerformer });
  }, [data]);

  return (
    <div className="dashboard-container">
      <MetricsGrid insights={insights} />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Bar dataKey="sales" fill="#0B2545" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};`,
    
    sql: `-- Advanced Sales Analysis Query
WITH monthly_metrics AS (
  SELECT 
    DATE_TRUNC('month', order_date) as month,
    SUM(total_amount) as revenue,
    COUNT(DISTINCT customer_id) as unique_customers,
    AVG(total_amount) as avg_order_value
  FROM orders 
  WHERE order_date >= CURRENT_DATE - INTERVAL '12 months' GROUP BY DATE_TRUNC('month', order_date)
),
growth_analysis AS (
  SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) as prev_revenue,
    (revenue - LAG(revenue) OVER (ORDER BY month)) / 
    LAG(revenue) OVER (ORDER BY month) * 100 as growth_rate
  FROM monthly_metrics
)
SELECT 
  month,
  revenue,
  growth_rate,
  CASE 
    WHEN growth_rate > 10 THEN 'High Growth'
    WHEN growth_rate > 0 THEN 'Positive Growth' ELSE'Needs Attention'
  END as performance_category
FROM growth_analysis
ORDER BY month DESC;`
  };

  const escapeHtml = (s) => {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const highlightCode = (code, lang) => {
    let out = escapeHtml(code);
    out = out.replace(/(".*?"|'.*?')/g, '<span class="text-orange-400">$1</span>');
    out = out.replace(/(^|\n)(\s*)(#.*|\/\/.*)/g, '$1$2<span class="text-green-400">$3</span>');
    out = out.replace(/\b(SELECT|FROM|WHERE|WITH|ORDER BY|GROUP BY|CASE|END|AS|JOIN)\b/g, '<span class="text-red-400">$1</span>');
    out = out.replace(/\b(import|from|const|let|var|return|if|else|function|export)\b/g, '<span class="text-red-400">$1</span>');
    out = out.replace(/\b\d+(?:\.\d+)?\b/g, '<span class="text-black">$&</span>');
    return out;
  };

  const renderVisualizationDemo = () => (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg p-6">
        <h4 className="text-lg font-semibold text-primary mb-4">Sales Performance Dashboard</h4>
        
        {/* Mini Chart */}
        <div className="h-64 bg-muted rounded-lg p-4 mb-4">
          <div className="flex justify-between items-end h-full">
            {chartData?.map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex space-x-1">
                  <div 
                    className="w-6 bg-primary rounded-t"
                    style={{ height: `${(item?.sales / 6000) * 120}px` }}
                  ></div>
                  <div 
                    className="w-6 bg-accent rounded-t opacity-60"
                    style={{ height: `${(item?.target / 6000) * 120}px` }}
                  ></div>
                </div>
                <span className="text-xs text-text-secondary">{item?.month}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Insights */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-primary/5 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-primary">28K</div>
            <div className="text-xs text-text-secondary">Total Sales</div>
          </div>
          <div className="bg-secondary/5 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-secondary">+12%</div>
            <div className="text-xs text-text-secondary">Growth Rate</div>
          </div>
          <div className="bg-accent/5 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-accent">Jun</div>
            <div className="text-xs text-text-secondary">Best Month</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalysisDemo = () => (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg p-6">
        <h4 className="text-lg font-semibold text-primary mb-4">Statistical Insights</h4>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="text-text-secondary">Correlation Analysis</span>
            <span className="font-mono text-primary">r = 0.847</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="text-text-secondary">Confidence Interval</span>
            <span className="font-mono text-primary">95% CI</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="text-text-secondary">P-value</span>
            <span className="font-mono text-primary">&lt; 0.001</span>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-accent/5 rounded-lg">
          <p className="text-sm text-text-secondary">
            <strong>Insight:</strong> Strong positive correlation between marketing spend and sales performance. 
            The relationship is statistically significant with 95% confidence.
          </p>
        </div>
      </div>
    </div>
  );

  const renderDevelopmentDemo = () => (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg p-6">
        <h4 className="text-lg font-semibold text-primary mb-4">Code Architecture</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Folder" size={16} color="var(--color-accent)" />
              <span className="text-sm">components/</span>
            </div>
            <span className="text-xs text-text-secondary">Reusable UI</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Database" size={16} color="var(--color-secondary)" />
              <span className="text-sm">hooks/</span>
            </div>
            <span className="text-xs text-text-secondary">Custom Logic</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={16} color="var(--color-primary)" />
              <span className="text-sm">utils/</span>
            </div>
            <span className="text-xs text-text-secondary">Helper Functions</span>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-text-secondary">
            <strong>Philosophy:</strong> Clean, modular architecture with separation of concerns. 
            Every component has a single responsibility and clear interfaces.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 sm:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
            Skills Laboratory
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Interactive demonstrations of my technical capabilities and problem-solving methodologies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skill Selector */}
          <div className="space-y-4">
            {skillDemos?.map((skill) => (
              <button
                key={skill?.id}
                onClick={() => setActiveDemo(skill?.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  activeDemo === skill?.id
                    ? 'bg-surface shadow-brand ring-2 ring-primary/20'
                    : 'bg-surface hover:shadow-brand-lg'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${skill?.color}`}>
                    <Icon name={skill?.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{skill?.title}</h3>
                    <p className="text-sm text-text-secondary">{skill?.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Demo Area */}
          <div className="lg:col-span-2">
            {activeDemo === 'visualization' && renderVisualizationDemo()}
            {activeDemo === 'analysis' && renderAnalysisDemo()}
            {activeDemo === 'development' && renderDevelopmentDemo()}
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">Code Samples</h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {Object.entries(codeExamples)?.map(([lang, code]) => (
              <div key={lang} className="bg-surface rounded-lg overflow-hidden shadow-brand">
                <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
                  <span className="font-mono text-sm uppercase">{lang}</span>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Copy"
                    onClick={() => navigator.clipboard?.writeText(code)}
                  >
                    Copy
                  </Button>
                </div>
                <pre className="p-4 text-xs overflow-x-auto bg-gray-900">
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }} />
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsLabSection;
