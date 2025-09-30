import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  User, 
  BarChart3, 
  FileText,
  UserPlus,
  Stethoscope,
  TrendingUp,
  Database
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-light via-background to-wellness-light/30">
      <Navbar />
      
      {/* Hero Section - Practitioner Focused */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-wellness-light/20 flex items-center justify-center">
                <Leaf className="w-10 h-10 text-wellness" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-wellness to-wellness-dark bg-clip-text text-transparent">
                AyuAahaar
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Advanced Ayurvedic Practice Management
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Transform your Ayurvedic practice with AI-powered patient analysis, structured diet planning, and comprehensive progress tracking
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" variant="wellness" asChild>
                <Link to="/login">Access Platform</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/assessment">View Demo Analysis</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Practitioner Benefits */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Empowering Ayurvedic Practitioners
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Move beyond handwritten prescriptions to data-driven, personalized Ayurvedic care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: User,
                title: "Comprehensive Patient Analysis",
                description: "Advanced prakriti assessment with detailed dosha analysis, body composition, and personalized recommendations"
              },
              {
                icon: Leaf,
                title: "AI-Powered Diet Planning",
                description: "Auto-generate structured diet plans or hand-pick foods from our extensive Ayurvedic database"
              },
              {
                icon: BarChart3,
                title: "Analytics & Insights",
                description: "Track patient progress, generate detailed reports, and gain insights to improve treatment outcomes"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-wellness transition-all duration-300 border-wellness-muted/20">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wellness-light/20 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-wellness" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Practice Solution</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to deliver modern Ayurvedic care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Database, title: "Patient Database", desc: "Secure patient records with unique IDs" },
              { icon: Stethoscope, title: "Prakriti Analysis", desc: "Traditional assessment with modern accuracy" },
              { icon: Leaf, title: "Food Database", desc: "Comprehensive Ayurvedic food properties" },
              { icon: FileText, title: "Six Tastes System", desc: "Rasa-based diet recommendations" },
              { icon: TrendingUp, title: "Digestion Analysis", desc: "Agni assessment and optimization" },
              { icon: UserPlus, title: "Custom Diet Plans", desc: "Personalized meal planning tools" },
              { icon: BarChart3, title: "Progress Tracking", desc: "Monitor patient compliance and outcomes" },
              { icon: FileText, title: "Report Generation", desc: "Professional reports for patients" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-card p-4 rounded-lg border border-wellness-muted/20 hover:border-wellness/30 transition-colors"
              >
                <div className="w-10 h-10 mb-3 rounded-full bg-wellness-light/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-wellness" />
                </div>
                <h4 className="font-semibold mb-1 text-wellness">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-wellness to-wellness-dark rounded-3xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Revolutionize Your Practice?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join progressive Ayurvedic practitioners using data-driven insights
            </p>
            <Button size="lg" variant="secondary" asChild className="bg-white text-wellness hover:bg-white/90">
              <Link to="/login">Get Started Today</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;