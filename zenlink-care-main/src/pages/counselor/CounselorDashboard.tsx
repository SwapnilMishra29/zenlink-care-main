import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { 
  Calendar, 
  Users, 
  MessageCircle, 
  Clock, 
  Home,
  Settings,
  LogOut,
  BarChart3,
  Heart,
  ArrowUp,
  ArrowDown,
  TrendingUp
} from "lucide-react";

const CounselorDashboard = () => {
  const counselorName = localStorage.getItem("counselorName") || "Dr. Smith";
  
  const stats = [
    {
      title: "Today's Appointments",
      value: "6",
      change: "+2",
      trend: "up",
      icon: Calendar,
      color: "primary"
    },
    {
      title: "Pending Sessions",
      value: "3",
      change: "-1",
      trend: "down",
      icon: Clock,
      color: "warning"
    },
    {
      title: "Total Patients",
      value: "34",
      change: "+5",
      trend: "up",
      icon: Users,
      color: "secondary"
    },
    {
      title: "This Week's Sessions",
      value: "18",
      change: "+3",
      trend: "up",
      icon: BarChart3,
      color: "primary"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      time: "2:00 PM",
      type: "Anxiety Support",
      status: "confirmed",
      stage: "Moderate"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      time: "3:30 PM",
      type: "Individual Therapy",
      status: "confirmed",
      stage: "Mild"
    },
    {
      id: 3,
      patientName: "Emily Rodriguez",
      time: "4:45 PM",
      type: "PTSD Session",
      status: "pending",
      stage: "At Risk"
    }
  ];

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/counselor/dashboard", active: true },
    { icon: Users, label: "My Patients", path: "/counselor/patients" },
    { icon: MessageCircle, label: "Chat", path: "/counselor/chat" },
    { icon: Clock, label: "Session History", path: "/counselor/sessions" },
    { icon: Settings, label: "Settings", path: "/counselor/settings" },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Mild": return "status-positive";
      case "Moderate": return "status-warning";
      case "At Risk": return "status-risk";
      default: return "bg-muted";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        {/* Sidebar */}
        <Sidebar className="w-64 border-r">
          <SidebarContent>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-healing rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="font-semibold">MindCare Pro</h2>
                  <p className="text-xs text-muted-foreground">Counselor Portal</p>
                </div>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      item.active 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-8">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Link>
                </Button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome {counselorName}! 👨‍⚕️
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your patients today
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link to="/counselor/patients">View All Patients</Link>
                </Button>
                <Button className="bg-gradient-healing" asChild>
                  <Link to="/counselor/chat">Open Chat</Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <div className={`flex items-center gap-1 text-sm ${
                          stat.trend === 'up' ? 'text-success' : 'text-warning'
                        }`}>
                          {stat.trend === 'up' ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )}
                          <span>{stat.change}</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        stat.color === 'primary' ? 'bg-primary/10' : 
                        stat.color === 'secondary' ? 'bg-secondary/10' : 'bg-warning/10'
                      }`}>
                        <stat.icon className={`h-6 w-6 ${
                          stat.color === 'primary' ? 'text-primary' : 
                          stat.color === 'secondary' ? 'text-secondary' : 'text-warning'
                        }`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Upcoming Sessions */}
              <div className="lg:col-span-2">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Today's Sessions
                    </CardTitle>
                    <CardDescription>
                      Your scheduled appointments for today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {session.patientName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{session.patientName}</h4>
                              <p className="text-sm text-muted-foreground">{session.type}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getStageColor(session.stage)}>
                                  {session.stage}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{session.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'}>
                              {session.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Insights */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link to="/counselor/patients">
                        <Users className="h-4 w-4 mr-2" />
                        View All Patients
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link to="/counselor/chat">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Open Chat
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link to="/counselor/sessions">
                        <Calendar className="h-4 w-4 mr-2" />
                        Session History
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Patient Insights */}
                <Card className="card-elevated bg-gradient-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary-foreground">
                      <TrendingUp className="h-5 w-5" />
                      This Week's Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-foreground/80">Improvement Rate</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-foreground/80">Session Completion</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-foreground/80">Patient Satisfaction</span>
                        <span className="font-medium">4.8/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">Sarah Johnson sent a message</p>
                          <p className="text-xs text-muted-foreground">5 min ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">New session request</p>
                          <p className="text-xs text-muted-foreground">15 min ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">Weekly report generated</p>
                          <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CounselorDashboard;