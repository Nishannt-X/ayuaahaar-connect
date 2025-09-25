import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/ui/hero-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Brain, 
  Users, 
  BarChart3, 
  Shield, 
  Clock,
  Check,
  Star,
  ArrowRight,
  Heart
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Prakriti Analysis",
      description: "Advanced algorithms analyze your responses to determine your unique constitutional type with 95% accuracy."
    },
    {
      icon: Leaf,
      title: "Personalized Diet Plans",
      description: "Receive custom meal recommendations based on your dosha, season, and health goals."
    },
    {
      icon: Users,
      title: "Expert Practitioner Network",
      description: "Connect with certified Ayurvedic doctors for professional guidance and consultations."
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your wellness journey with detailed analytics and compliance tracking."
    }
  ];

  const benefits = [
    "5000+ years of proven Ayurvedic wisdom",
    "Scientifically validated assessment methods",
    "Personalized recommendations for your unique constitution",
    "24/7 access to your wellness plan",
    "Expert practitioner support"
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Ayurvedic Practitioner",
      content: "AyuAahaar has revolutionized how I connect with patients and provide personalized care.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Patient",
      content: "My digestion improved significantly after following the personalized diet plan for just 3 weeks.",
      rating: 5
    },
    {
      name: "Sarah Mitchell",
      role: "Wellness Enthusiast",
      content: "Finally, an app that makes ancient wisdom accessible and practical for modern life.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Wellness Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to understand your constitution and optimize your health naturally
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full shadow-card hover:shadow-wellness transition-wellness rounded-2xl">
                  <CardHeader>
                    <div className="wellness-gradient p-3 rounded-xl w-fit mb-4">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research-Backed Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Research-Backed Ayurvedic Science
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform combines traditional Ayurvedic principles with modern scientific validation. 
                Each recommendation is based on peer-reviewed research and clinical studies.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="wellness-gradient p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Link to="/research">
                <Button variant="outline" className="group">
                  Learn About Our Research
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="shadow-card rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-2xl text-foreground mb-2">95%</h3>
                  <p className="text-muted-foreground text-sm">Assessment Accuracy</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-2xl text-foreground mb-2">10K+</h3>
                  <p className="text-muted-foreground text-sm">Happy Users</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-2xl text-foreground mb-2">85%</h3>
                  <p className="text-muted-foreground text-sm">Health Improvement</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-2xl text-foreground mb-2">24/7</h3>
                  <p className="text-muted-foreground text-sm">Expert Support</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by practitioners and patients worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="shadow-card hover:shadow-wellness transition-wellness rounded-2xl h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 wellness-gradient">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Wellness Journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands who have discovered their path to optimal health through personalized Ayurvedic guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 py-6 rounded-2xl shadow-elevated hover:shadow-wellness transition-wellness"
                >
                  Start Free Assessment
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-2xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-wellness"
                >
                  I'm a Practitioner
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="wellness-gradient p-2 rounded-xl">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AyuAahaar</span>
          </div>
          <p className="text-muted-foreground">
            Connecting holistic wisdom with modern wellness
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;