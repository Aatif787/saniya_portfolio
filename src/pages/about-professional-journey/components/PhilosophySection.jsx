import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhilosophySection = () => {
  const philosophyPrinciples = [
    {
      icon: "Target",
      title: "Problem-First Approach",
      description: "I start every project by deeply understanding the problem before jumping to solutions. Data without context is just noise.",
      example: "When analyzing customer churn, I spend time understanding the business model and customer journey before touching any data."
    },
    {
      icon: "Users",
      title: "Human-Centered Analytics",
      description: "Behind every data point is a human story. I design insights that resonate with people, not just algorithms.",
      example: "Instead of showing raw conversion rates, I create narratives about user behavior patterns and emotional triggers."
    },
    {
      icon: "Lightbulb",
      title: "Simplicity in Complexity",
      description: "The best insights are simple to understand but sophisticated in their foundation. I bridge technical depth with clear communication.",
      example: "Transforming complex machine learning models into intuitive dashboards that non-technical stakeholders can act upon."
    },
    {
      icon: "Zap",
      title: "Continuous Learning",
      description: "Technology evolves rapidly, and so do I. Every project teaches me something new about data, design, or human behavior.",
      example: "Currently exploring how AI can enhance data storytelling while maintaining the human touch that makes insights meaningful."
    }
  ];

  const workingStyle = [
    {
      phase: "Discovery",
      description: "Deep dive into business context, stakeholder needs, and existing data landscape",
      tools: ["Stakeholder Interviews", "Data Audits", "Requirement Mapping"]
    },
    {
      phase: "Analysis",
      description: "Rigorous data exploration with statistical validation and pattern recognition",
      tools: ["Python/R", "SQL", "Statistical Testing", "Visualization"]
    },
    {
      phase: "Synthesis",
      description: "Transform findings into compelling narratives with actionable recommendations",
      tools: ["Storytelling", "Dashboard Design", "Presentation Craft"]
    },
    {
      phase: "Implementation",
      description: "Collaborate on solution deployment with continuous monitoring and iteration",
      tools: ["Agile Methods", "User Feedback", "Performance Tracking"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            My Philosophy & Approach
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            How I bridge analytical rigor with user-centric design to create meaningful digital experiences
          </p>
        </div>

        {/* Core Principles */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">Core Principles</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {philosophyPrinciples?.map((principle, index) => (
              <div
                key={index}
                className="bg-surface rounded-xl p-6 shadow-brand hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={principle?.icon} size={24} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-primary mb-2">{principle?.title}</h4>
                    <p className="text-text-secondary mb-3">{principle?.description}</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-text-secondary italic">
                        <strong>Example:</strong> {principle?.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Working Style */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">My Working Process</h3>
          <div className="grid lg:grid-cols-4 gap-6">
            {workingStyle?.map((phase, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < workingStyle?.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-6 h-0.5 bg-border z-0"></div>
                )}
                
                <div className="bg-surface rounded-xl p-6 shadow-brand hover-lift relative z-10">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <h4 className="text-lg font-bold text-primary">{phase?.phase}</h4>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-4 text-center">
                    {phase?.description}
                  </p>
                  
                  <div className="space-y-2">
                    {phase?.tools?.map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        className="bg-muted px-3 py-1 rounded-full text-xs text-text-secondary text-center"
                      >
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Touch */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Beyond the Technical</h3>
              <div className="space-y-4 text-text-secondary">
                <p>
                  While I love diving deep into data and code, what truly drives me is the human impact of technology. 
                  Every dashboard I create, every insight I uncover, and every application I build is designed with 
                  real people in mind.
                </p>
                <p>
                  I believe that the best technical solutions are invisible to the end user - they just work, 
                  intuitively and elegantly. This philosophy guides everything from my choice of visualization 
                  colors to the architecture of my applications.
                </p>
                <p>
                  When I'm not analyzing data or writing code, you'll find me sketching user flows, reading about 
                  cognitive psychology, or experimenting with new ways to make complex information more accessible.
                </p>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">User Psychology</span>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">Design Thinking</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Continuous Learning</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Collaborative workspace showing data analysis and design thinking"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
              </div>
              
              {/* Floating Quote */}
              <div className="absolute -bottom-6 -left-6 bg-surface p-4 rounded-lg shadow-brand-lg max-w-xs">
                <p className="text-sm text-text-secondary italic">
                  "The best insights come from the intersection of data science and human empathy."
                </p>
                <div className="text-xs text-accent mt-2 font-medium">- My Design Philosophy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;