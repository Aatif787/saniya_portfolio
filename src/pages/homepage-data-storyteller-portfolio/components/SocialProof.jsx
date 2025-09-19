import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialProof = () => {
  const metrics = [
    {
      icon: "Briefcase",
      value: "15+",
      label: "Projects Completed",
      description: "Successful data analytics and web development projects",
      color: "text-blue-600"
    },
    {
      icon: "BarChart3", 
      value: "50K+",
      label: "Data Points Analyzed",
      description: "Complex datasets transformed into actionable insights",
      color: "text-green-600"
    },
    {
      icon: "Users",
      value: "150+",
      label: "Users Impacted",
      description: "End users benefiting from developed solutions",
      color: "text-purple-600"
    },
    {
      icon: "TrendingUp",
      value: "40%",
      label: "Average ROI Improvement",
      description: "Measurable business impact across client projects",
      color: "text-orange-600"
    },
    {
      icon: "Clock",
      value: "3+",
      label: "Years Learning",
      description: "Continuous skill development and professional growth",
      color: "text-teal-600"
    },
    {
      icon: "Award",
      value: "100%",
      label: "Client Satisfaction",
      description: "Consistent delivery of high-quality solutions",
      color: "text-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Product Manager",
      company: "TechStart Solutions",
      content: "Saniya's data analysis helped us identify key customer segments that increased our conversion rate by 35%. Her insights were actionable and clearly presented.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      name: "Priya Sharma", 
      role: "Marketing Director",
      company: "Digital Growth Co",
      content: "The React dashboard Saniya built transformed how our team tracks campaign performance. Intuitive design and powerful analytics in one platform.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg", 
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Startup Founder",
      company: "InnovateLab",
      content: "Working with Saniya was excellent. She understood our business needs and delivered a solution that exceeded expectations. Highly recommended!",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 5
    }
  ];

  const achievements = [
    {
      title: "BCA Graduate",
      institution: "University of Technology",
      year: "2024",
      icon: "GraduationCap"
    },
    {
      title: "Data Analytics Certification",
      institution: "Google Analytics",
      year: "2024", 
      icon: "Certificate"
    },
    {
      title: "React Developer Certification",
      institution: "Meta Blueprint",
      year: "2023",
      icon: "Code"
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Proven Track Record
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Numbers that matter, testimonials that inspire, and achievements that demonstrate 
            commitment to excellence in data analytics and web development.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {metrics?.map((metric, index) => (
            <motion.div
              key={metric?.label}
              className="text-center p-6 bg-background border border-border rounded-xl shadow-brand hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-4 ${metric?.color}`}>
                <Icon name={metric?.icon} size={24} />
              </div>
              
              <motion.div
                className="text-2xl lg:text-3xl font-bold text-primary mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {metric?.value}
              </motion.div>
              
              <h3 className="font-semibold text-text-primary mb-2 text-sm lg:text-base">
                {metric?.label}
              </h3>
              
              <p className="text-text-secondary text-xs leading-relaxed">
                {metric?.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-primary text-center mb-12">
            What Clients Say
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <motion.div
                key={testimonial?.name}
                className="bg-background border border-border rounded-xl p-6 shadow-brand hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-text-secondary mb-6 leading-relaxed">
                  "{testimonial?.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm">
                      {testimonial?.name}
                    </h4>
                    <p className="text-text-secondary text-xs">
                      {testimonial?.role} at {testimonial?.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-primary text-center mb-12">
            Education & Certifications
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {achievements?.map((achievement, index) => (
              <motion.div
                key={achievement?.title}
                className="bg-background border border-border rounded-xl p-6 text-center shadow-brand hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                  <Icon name={achievement?.icon} size={28} />
                </div>
                
                <h4 className="font-bold text-text-primary mb-2">
                  {achievement?.title}
                </h4>
                
                <p className="text-text-secondary text-sm mb-1">
                  {achievement?.institution}
                </p>
                
                <p className="text-accent font-semibold text-sm">
                  {achievement?.year}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;