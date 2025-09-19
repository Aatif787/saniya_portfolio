import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProblemSolvingSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const problemSolvingSteps = [
    {
      id: 0,
      title: "Problem Definition",
      icon: "Search",
      description: "Clearly define the problem and understand stakeholder needs",
      details: `I start every project by conducting stakeholder interviews and analyzing existing data to understand the core problem. This involves:
      
• Identifying key pain points and business objectives
• Gathering requirements from all stakeholders
• Defining success metrics and KPIs
• Creating a problem statement that everyone agrees on`,
      example: "E-commerce client had declining conversion rates but didn't know why. Through user analytics and stakeholder interviews, we identified that the checkout process was too complex and mobile experience was poor.",
      tools: ["User Interviews", "Analytics Review", "Stakeholder Mapping", "Problem Framing"]
    },
    {
      id: 1,
      title: "Data Collection & Analysis",
      icon: "Database",
      description: "Gather relevant data and perform comprehensive analysis",
      details: `Once the problem is defined, I collect and analyze all relevant data sources:
      
• Quantitative data from databases, APIs, and analytics tools
• Qualitative insights from user feedback and surveys
• Market research and competitive analysis
• Historical trends and patterns`,
      example: "Collected 6 months of user behavior data, conducted 15 user interviews, analyzed competitor checkout flows, and reviewed customer support tickets to understand friction points.",
      tools: ["SQL Queries", "Python/Pandas", "Google Analytics", "User Surveys"]
    },
    {
      id: 2,
      title: "Solution Design",
      icon: "Lightbulb",
      description: "Design data-driven solutions with user experience in mind",
      details: `Based on the analysis, I design solutions that balance technical feasibility with user needs:
      
• Create wireframes and prototypes for user interfaces
• Design data models and system architecture
• Plan implementation phases and milestones
• Consider scalability and maintenance requirements`,
      example: "Designed a simplified 3-step checkout process with guest checkout option, mobile-first responsive design, and real-time validation to reduce form errors.",
      tools: ["Figma", "System Design", "Prototyping", "Architecture Planning"]
    },
    {
      id: 3,
      title: "Implementation & Testing",
      icon: "Code",
      description: "Build the solution with iterative testing and validation",
      details: `I implement solutions using agile methodology with continuous testing:
      
• Develop MVP with core functionality first
• Implement A/B testing for key features
• Conduct user testing sessions
• Monitor performance and gather feedback`,
      example: "Built the new checkout flow in React, implemented A/B testing with 50/50 traffic split, conducted usability testing with 20 users, and monitored conversion metrics daily.",
      tools: ["React/Node.js", "A/B Testing", "User Testing", "Performance Monitoring"]
    },
    {
      id: 4,
      title: "Measurement & Optimization",
      icon: "TrendingUp",
      description: "Measure results and continuously optimize based on data",
      details: `After implementation, I continuously monitor and optimize the solution:
      
• Track KPIs and success metrics
• Analyze user behavior and feedback
• Identify areas for improvement
• Implement iterative enhancements`,
      example: "Achieved 34% increase in conversion rate, 28% reduction in cart abandonment, and 45% improvement in mobile user satisfaction. Continued optimizing based on user feedback.",
      tools: ["Analytics Dashboards", "Performance Metrics", "User Feedback", "Continuous Improvement"]
    }
  ];

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % problemSolvingSteps?.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + problemSolvingSteps?.length) % problemSolvingSteps?.length);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            My Problem-Solving Approach
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            How I combine analytical thinking with user empathy to deliver solutions that work
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps Navigation */}
          <div className="space-y-4">
            {problemSolvingSteps?.map((step, index) => (
              <div
                key={step?.id}
                onClick={() => setActiveStep(index)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-primary text-primary-foreground border-primary shadow-brand'
                    : 'bg-surface border-border hover:border-primary/50 hover:shadow-brand'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    activeStep === index
                      ? 'bg-primary-foreground/20'
                      : 'bg-primary/10'
                  }`}>
                    <Icon 
                      name={step?.icon} 
                      size={20} 
                      className={activeStep === index ? 'text-primary-foreground' : 'text-primary'} 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      activeStep === index ? 'text-primary-foreground' : 'text-text-primary'
                    }`}>
                      {step?.title}
                    </h3>
                    <p className={`text-sm ${
                      activeStep === index ? 'text-primary-foreground/80' : 'text-text-secondary'
                    }`}>
                      {step?.description}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    activeStep === index
                      ? 'border-primary-foreground bg-primary-foreground text-primary'
                      : 'border-primary/30 text-primary'
                  }`}>
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Step Details */}
          <div className="bg-surface rounded-lg shadow-brand-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={problemSolvingSteps?.[activeStep]?.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    {problemSolvingSteps?.[activeStep]?.title}
                  </h3>
                  <p className="text-text-secondary">
                    Step {activeStep + 1} of {problemSolvingSteps?.length}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={prevStep}>
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <Button variant="outline" size="icon" onClick={nextStep}>
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-text-primary mb-3">Methodology</h4>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {problemSolvingSteps?.[activeStep]?.details}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Icon name="FileText" size={16} className="mr-2" />
                  Real Project Example
                </h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {problemSolvingSteps?.[activeStep]?.example}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-3">Tools & Techniques</h4>
                <div className="flex flex-wrap gap-2">
                  {problemSolvingSteps?.[activeStep]?.tools?.map((tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm rounded-full border border-accent/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">Progress</span>
                <span className="text-sm text-text-muted">
                  {activeStep + 1} / {problemSolvingSteps?.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((activeStep + 1) / problemSolvingSteps?.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolvingSection;