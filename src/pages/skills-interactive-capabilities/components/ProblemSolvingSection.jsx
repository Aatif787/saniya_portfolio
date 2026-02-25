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
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3 sm:mb-4">
            My Problem-Solving Approach
          </h2>
          <p className="text-sm sm:text-lg text-text-secondary max-w-3xl mx-auto px-4">
            How I combine analytical thinking with user empathy to deliver solutions that work
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Steps Navigation */}
          <div className="space-y-3 sm:space-y-4">
            {problemSolvingSteps?.map((step, index) => (
              <div
                key={step?.id}
                onClick={() => setActiveStep(index)}
                className={`p-3 sm:p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-primary text-primary-foreground border-primary shadow-brand scale-[1.02]'
                    : 'bg-surface border-border hover:border-primary/50 hover:shadow-brand'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activeStep === index
                      ? 'bg-primary-foreground/20'
                      : 'bg-primary/10'
                  }`}>
                    <Icon 
                      name={step?.icon} 
                      size={18} 
                      className={activeStep === index ? 'text-primary-foreground' : 'text-primary'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm sm:text-base truncate ${
                      activeStep === index ? 'text-primary-foreground' : 'text-text-primary'
                    }`}>
                      {step?.title}
                    </h3>
                    <p className={`text-xs sm:text-sm line-clamp-1 ${
                      activeStep === index ? 'text-primary-foreground/80' : 'text-text-secondary'
                    }`}>
                      {step?.description}
                    </p>
                  </div>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    activeStep === index
                      ? 'border-primary-foreground bg-primary-foreground text-primary'
                      : 'border-primary/30 text-primary'
                  }`}>
                    <span className="text-xs sm:text-sm font-bold">{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Step Details */}
          <div className="bg-surface rounded-2xl shadow-brand-lg p-5 sm:p-8 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={problemSolvingSteps?.[activeStep]?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
                    {problemSolvingSteps?.[activeStep]?.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    Step {activeStep + 1} of {problemSolvingSteps?.length}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1 sm:space-x-2">
                <Button variant="outline" size="sm" className="p-2" onClick={prevStep}>
                  <Icon name="ChevronLeft" size={14} />
                </Button>
                <Button variant="outline" size="sm" className="p-2" onClick={nextStep}>
                  <Icon name="ChevronRight" size={14} />
                </Button>
              </div>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-2 sm:mb-3">Methodology</h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-line bg-muted/20 p-3 rounded-xl">
                  {problemSolvingSteps?.[activeStep]?.details}
                </p>
              </div>

              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                  <Icon name="FileText" size={14} className="mr-2" />
                  Real Project Example
                </h4>
                <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                  {problemSolvingSteps?.[activeStep]?.example}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-2 sm:mb-3">Tools & Techniques</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {problemSolvingSteps?.[activeStep]?.tools?.map((tool, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-accent/10 text-accent-foreground text-[10px] sm:text-xs font-medium rounded-full border border-accent/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolvingSection;