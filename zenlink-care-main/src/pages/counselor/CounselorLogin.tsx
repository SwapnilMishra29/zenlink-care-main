import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, Brain } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CounselorLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    license: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication logic
    localStorage.setItem("userType", "counselor");
    localStorage.setItem("counselorName", formData.name || "Dr. Smith");
    
    toast({
      title: isLogin ? "Welcome back, Doctor!" : "Account created successfully!",
      description: "Redirecting to your dashboard...",
    });
    
    setTimeout(() => {
      navigate("/counselor/dashboard");
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <Card className="card-elevated">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-secondary-foreground" />
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome back, Doctor" : "Join our platform"}
            </CardTitle>
            <CardDescription>
              {isLogin ? "Sign in to manage your practice" : "Start helping patients today"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <Brain className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Dr. Jane Smith"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      name="license"
                      type="text"
                      placeholder="Your professional license number"
                      value={formData.license}
                      onChange={handleInputChange}
                      required={!isLogin}
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your professional email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-healing hover:shadow-elevated transition-all duration-300"
                size="lg"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-secondary hover:text-secondary/80 transition-colors text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>

            {!isLogin && (
              <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-secondary font-medium mb-2">Account Verification Required</p>
                <p className="text-xs text-muted-foreground">
                  New counselor accounts require license verification before activation. 
                  You'll receive an email with next steps after registration.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CounselorLogin;