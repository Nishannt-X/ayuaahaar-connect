import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Brain, Users } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Personalized dosha assessment using advanced algorithms"
    },
    {
      icon: Leaf,
      title: "Traditional Wisdom",
      description: "5000-year-old Ayurvedic principles in modern format"
    },
    {
      icon: Heart,
      title: "Holistic Wellness",
      description: "Complete mind-body-spirit health approach"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Connect with certified Ayurvedic practitioners"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary-soft/20 to-accent/30">
      <div className="container mx-auto text-center">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Connecting{" "}
            <span className="wellness-gradient bg-clip-text text-transparent">
              holistic wisdom
            </span>{" "}
            with modern wellness
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Discover your unique constitution with AI-powered Ayurvedic analysis. 
            Get personalized diet plans and connect with expert practitioners for 
            optimal health and balance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/signup">
              <Button 
                size="lg" 
                className="wellness-gradient shadow-wellness hover:shadow-elevated transition-wellness text-lg px-8 py-6 rounded-2xl"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link to="/features">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-2xl border-primary/20 hover:border-primary/40 transition-wellness"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
            >
              <Card className="p-6 shadow-card hover:shadow-wellness transition-wellness bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl group">
                <div className="wellness-gradient p-3 rounded-xl w-fit mx-auto mb-4 group-hover:shadow-elevated transition-wellness">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;