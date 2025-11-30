import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const InteractiveDemo = ({ skill, onClose }) => {
  const [activeTab, setActiveTab] = useState('visualization');
  const [chartData, setChartData] = useState([]);
  const [codeExample, setCodeExample] = useState('');

  const sampleData = [
    { name: 'Jan', sales: 4000, users: 2400 },
    { name: 'Feb', sales: 3000, users: 1398 },
    { name: 'Mar', sales: 2000, users: 9800 },
    { name: 'Apr', sales: 2780, users: 3908 },
    { name: 'May', sales: 1890, users: 4800 },
    { name: 'Jun', sales: 2390, users: 3800 }
  ];

  const pieData = [
    { name: 'Desktop', value: 45, color: '#0B2545' },
    { name: 'Mobile', value: 35, color: '#5C9A8F' },
    { name: 'Tablet', value: 20, color: '#C6A15A' }
  ];

  useEffect(() => {
    setChartData(sampleData);
    setCodeExample(getCodeExample(skill?.name));
  }, [skill]);

  const getCodeExample = (skillName) => {
    const examples = {
      'Python': `# Data Analysis with Pandas
import pandas as pd
import numpy as np

# Load and analyze sales data
df = pd.read_csv('sales_data.csv')
monthly_sales = df.groupby('month')['revenue'].sum()

# Calculate growth rate
growth_rate = monthly_sales.pct_change().mean()
print(f"Average monthly growth: {growth_rate:.2%}")`,

      'React': `// Interactive Dashboard Component
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});
  
  useEffect(() => {
    fetchMetrics().then(setMetrics);
  }, []);

  return (
    <div className="dashboard">
      <MetricCard title="Revenue" value={metrics.revenue} />
      <ChartComponent data={metrics.chartData} />
    </div>
  );
};`,

      'SQL': `-- Advanced Analytics Query
WITH monthly_metrics AS (
  SELECT 
    DATE_TRUNC('month', order_date) as month,
    SUM(total_amount) as revenue,
    COUNT(DISTINCT customer_id) as unique_customers
  FROM orders 
  WHERE order_date >= '2024-01-01'
  GROUP BY 1
)
SELECT 
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) as prev_revenue,
  (revenue - LAG(revenue) OVER (ORDER BY month)) / 
  LAG(revenue) OVER (ORDER BY month) * 100 as growth_rate
FROM monthly_metrics;`,

      'Tableau': `// Tableau JavaScript API Integration
const viz = new tableau.Viz(
  document.getElementById('tableauViz'),
  'https://public.tableau.com/views/SalesAnalysis/Dashboard1',
  {
    hideTabs: true,
    hideToolbar: true,
    onFirstInteractive: () => {
      console.log('Visualization loaded successfully');
    }
  }
);`
    };

    return examples?.[skillName] || `// ${skillName} code example\nconsole.log('Interactive demo for ${skillName}');`;
  };

  const tabs = [
    { id: 'visualization', name: 'Data Visualization', icon: 'BarChart3' },
    { id: 'code', name: 'Code Example', icon: 'Code' },
    { id: 'analysis', name: 'Analysis', icon: 'TrendingUp' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-brand-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={skill?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{skill?.name} Demo</h2>
              <p className="text-sm text-text-secondary">Interactive capability showcase</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'visualization' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Sample Data Visualizations</h3>
                
                {/* Bar Chart */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <h4 className="text-md font-medium text-text-primary mb-3">Monthly Sales & Users</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }} 
                        />
                        <Bar dataKey="sales" fill="#0B2545" />
                        <Bar dataKey="users" fill="#5C9A8F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-text-primary mb-3">Device Usage Distribution</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {pieData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry?.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Code Implementation</h3>
              <div className="rounded-lg overflow-auto bg-gray-900">
                <pre className="text-emerald-300 text-sm font-mono whitespace-pre leading-6 p-4">
                  {codeExample}
                </pre>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Implementation Notes</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      This code demonstrates best practices including error handling, performance optimization, 
                      and clean architecture patterns that I apply in real-world projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Key Insights & Analysis</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="TrendingUp" size={20} className="text-green-600" />
                      <h4 className="font-medium text-green-900">Growth Trends</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      Data shows 23% month-over-month growth in user engagement, 
                      with mobile traffic increasing by 45% in Q2 2024.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Users" size={20} className="text-blue-600" />
                      <h4 className="font-medium text-blue-900">User Behavior</h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      Desktop users show higher conversion rates (3.2%) compared to 
                      mobile (2.1%), indicating optimization opportunities.
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Target" size={20} className="text-purple-600" />
                      <h4 className="font-medium text-purple-900">Recommendations</h4>
                    </div>
                    <p className="text-sm text-purple-700">
                      Focus on mobile UX improvements and implement progressive web app 
                      features to bridge the conversion gap.
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="AlertTriangle" size={20} className="text-orange-600" />
                      <h4 className="font-medium text-orange-900">Action Items</h4>
                    </div>
                    <p className="text-sm text-orange-700">
                      Implement A/B testing for mobile checkout flow and add 
                      real-time analytics dashboard for stakeholder visibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-text-muted">
            Interactive demo showcasing {skill?.name} capabilities
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close Demo
            </Button>
            <Button variant="default" size="sm" iconName="ExternalLink" iconPosition="right">
              View Full Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
