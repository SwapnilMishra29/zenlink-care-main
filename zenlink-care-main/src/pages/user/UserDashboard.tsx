import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MessageCircle, 
  Users, 
  Bot, 
  Clock, 
  Star,
  ChevronRight,
  Heart
} from "lucide-react";

const UserDashboard = () => {
  const userName = localStorage.getItem("userName") || "User";
  
  const upcomingSessions = [
    {
      id: 1,
      counselor: "Dr. Sarah Johnson",
      date: "2024-01-20",
      time: "2:00 PM",
      type: "Individual Therapy",
      status: "confirmed"
    },
    {
      id: 2,
      counselor: "Dr. Michael Chen",
      date: "2024-01-22",
      time: "10:00 AM", 
      type: "Anxiety Support",
      status: "pending"
    }
  ];

  const quickActions = [
    {
      title: "Book New Session",
      description: "Schedule with a counselor",
      icon: Calendar,
      link: "/user/book-session",
      color: "primary"
    },
    {
      title: "Browse Counselors",
      description: "Find the right therapist",
      icon: Users,
      link: "/user/counselors",
      color: "secondary"
    },
    {
      title: "AI Chat Support",
      description: "Get immediate help",
      icon: Bot,
      link: "/user/ai-chat",
      color: "primary"
    },
    {
      title: "My Sessions",
      description: "View session history",
      icon: Clock,
      link: "/user/sessions",
      color: "secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-muted-foreground">
              How are you feeling today? Your mental health journey continues here.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/user/profile">Profile</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Logout</Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {quickActions.map((action, index) => (
                <Card key={index} className="card-elevated hover:shadow-floating transition-all duration-300 group cursor-pointer">
                  <Link to={action.link}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          action.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'
                        }`}>
                          <action.icon className={`h-6 w-6 ${
                            action.color === 'primary' ? 'text-primary' : 'text-secondary'
                          }`} />
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Upcoming Sessions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Sessions
                </CardTitle>
                <CardDescription>
                  Your scheduled appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                            <Heart className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium">{session.counselor}</h4>
                            <p className="text-sm text-muted-foreground">{session.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.date} at {session.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'}>
                            {session.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No upcoming sessions</p>
                    <Button asChild>
                      <Link to="/user/book-session">Book Your First Session</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wellness Check */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Daily Wellness Check</CardTitle>
                <CardDescription>How are you feeling today?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {["😊", "😐", "😔"].map((emoji, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-12 text-2xl hover:shadow-card transition-all duration-300"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Chat Widget */}
            <Card className="card-elevated bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Support
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Need immediate support? Chat with our AI assistant 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to="/user/ai-chat">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Chat
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Completed session with Dr. Sarah</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Used AI chat support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Booked upcoming session</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;