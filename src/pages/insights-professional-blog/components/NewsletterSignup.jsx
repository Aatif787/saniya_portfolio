import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-brand rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Welcome aboard! 🎉</h3>
        <p className="text-white/90">
          Thank you for subscribing. You'll receive monthly insights and updates directly in your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-brand rounded-2xl p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
        <p className="text-white/90">
          Get monthly insights on data analytics, development trends, and career advice delivered to your inbox.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/20"
        />
        
        <Button
          type="submit"
          variant="secondary"
          fullWidth
          loading={isLoading}
          iconName="Send"
          iconPosition="right"
          disabled={!email}
        >
          Subscribe to Newsletter
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-white/70 text-xs">
          No spam, unsubscribe at any time. Read our{' '}
          <a href="#" className="text-white underline hover:no-underline">
            privacy policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;