import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Mail, Lock, User, Phone } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary-soft/20 to-accent/30">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="wellness-gradient p-3 rounded-xl shadow-wellness transition-wellness group-hover:shadow-elevated">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">AyuAahaar</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-elevated rounded-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Welcome Back
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to continue your wellness journey
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="patient" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="patient">Patient</TabsTrigger>
                  <TabsTrigger value="practitioner">Practitioner</TabsTrigger>
                </TabsList>

                <TabsContent value="patient">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="patient-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="patient-password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full wellness-gradient shadow-wellness hover:shadow-elevated transition-wellness rounded-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>

                    <div className="text-center">
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:text-primary/80 transition-wellness"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="practitioner">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="practitioner-email">Professional Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="practitioner-email"
                          type="email"
                          placeholder="doctor@clinic.com"
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="practitioner-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="practitioner-password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full wellness-gradient shadow-wellness hover:shadow-elevated transition-wellness rounded-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Access Dashboard"}
                    </Button>

                    <div className="text-center">
                      <Link
                        to="/practitioner-signup"
                        className="text-sm text-primary hover:text-primary/80 transition-wellness"
                      >
                        Need practitioner access?
                      </Link>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary/80 font-medium transition-wellness"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-wellness"
          >
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;