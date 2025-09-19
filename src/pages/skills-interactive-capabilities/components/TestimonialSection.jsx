import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior Data Manager",
      company: "TechCorp Solutions",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `Saniya has an exceptional ability to translate complex data into actionable insights. Her dashboard for our sales team increased our conversion tracking accuracy by 40% and helped identify key growth opportunities we were missing.`,
      rating: 5,
      project: "Sales Analytics Dashboard",
      skills: ["Python", "Tableau", "SQL"]
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Product Manager",
      company: "InnovateLabs",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `Working with Saniya on our user analytics project was fantastic. She not only delivered clean, efficient code but also provided valuable UX insights that improved our user engagement by 28%. Her ability to bridge technical and user experience is remarkable.`,
      rating: 5,
      project: "User Analytics Platform",
      skills: ["React", "Node.js", "UX Design"]
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Startup Founder",
      company: "DataDriven Co.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `Saniya built our entire business intelligence system from scratch. Her systematic approach to problem-solving and attention to detail resulted in a solution that scaled with our growth. The automated reporting saved us 15 hours per week.`,
      rating: 5,
      project: "Business Intelligence System",
      skills: ["Power BI", "SQL", "Python"]
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "GrowthMetrics",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `Saniya's data storytelling skills are outstanding. She transformed our complex marketing data into clear, compelling visualizations that our executive team could easily understand and act upon. Her work directly influenced our Q3 strategy.`,
      rating: 5,
      project: "Marketing Analytics Dashboard",
      skills: ["Tableau", "Data Visualization", "Business Analysis"]
    },
    {
      id: 5,
      name: "Amit Patel",
      role: "CTO",
      company: "NextGen Systems",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      content: `Saniya's full-stack development skills impressed our entire team. She delivered a responsive web application with clean architecture and excellent performance. Her code quality and documentation made future maintenance seamless.`,
      rating: 5,
      project: "Customer Portal Development",
      skills: ["React", "Node.js", "MongoDB"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const currentData = testimonials?.[currentTestimonial];

  return (
    <section className="py-16 bg-gradient-brand text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            What Collaborators Say
          </h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Feedback from clients and colleagues on my ability to bridge analytics and user experience
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-12 text-center">
            {/* Quote Icon */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Quote" size={32} className="text-white" />
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(currentData?.rating)]?.map((_, index) => (
                <Icon key={index} name="Star" size={20} className="text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto">
              "{currentData?.content}"
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                <Image
                  src={currentData?.avatar}
                  alt={currentData?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-semibold">{currentData?.name}</h4>
                <p className="opacity-80">{currentData?.role}</p>
                <p className="text-sm opacity-70">{currentData?.company}</p>
              </div>
            </div>

            {/* Project & Skills */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <Icon name="Briefcase" size={16} className="opacity-70" />
                <span className="text-sm opacity-90">{currentData?.project}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {currentData?.skills?.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial
                      ? 'bg-white scale-125' :'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">25+</div>
            <div className="text-sm opacity-80">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-sm opacity-80">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-sm opacity-80">Technologies Mastered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">3+</div>
            <div className="text-sm opacity-80">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;