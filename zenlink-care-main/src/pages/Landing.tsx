import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, Brain, MessageCircle, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-mental-health.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Professional Mental Health Support
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Mental Health
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Journey</span>
              <br />Starts Here
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with licensed mental health professionals through our secure platform. 
              Get the support you need, when you need it.
            </p>

            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="card-elevated hover:shadow-floating transition-all duration-300 group cursor-pointer border-2 hover:border-primary/20">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:animate-glow">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">I need support</CardTitle>
                  <CardDescription className="text-muted-foreground text-lg">
                    Book sessions with licensed counselors and access AI-powered support
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Book counseling sessions</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <span>24/7 AI chat support</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Secure & confidential</span>
                    </div>
                  </div>
                  <Link to="/user/login">
                    <Button className="w-full bg-gradient-primary hover:shadow-elevated transition-all duration-300" size="lg">
                      Continue as User
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="card-elevated hover:shadow-floating transition-all duration-300 group cursor-pointer border-2 hover:border-secondary/20">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-healing rounded-full flex items-center justify-center mb-4 group-hover:animate-glow">
                    <Brain className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">I'm a counselor</CardTitle>
                  <CardDescription className="text-muted-foreground text-lg">
                    Manage your practice and provide professional mental health support
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Users className="h-5 w-5 text-secondary" />
                      <span>Manage patient sessions</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MessageCircle className="h-5 w-5 text-secondary" />
                      <span>Real-time chat system</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="h-5 w-5 text-secondary" />
                      <span>Session scheduling</span>
                    </div>
                  </div>
                  <Link to="/counselor/login">
                    <Button className="w-full bg-gradient-healing hover:shadow-elevated transition-all duration-300" size="lg">
                      Continue as Counselor
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional, secure, and accessible mental health support designed for modern needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">End-to-end encryption ensures your conversations remain completely confidential</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Licensed Professionals</h3>
              <p className="text-muted-foreground">Connect with certified mental health counselors and therapists</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">AI-powered chat support available anytime you need immediate assistance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;