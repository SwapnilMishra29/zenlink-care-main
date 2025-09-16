import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  MessageCircle, 
  Calendar, 
  Filter,
  Clock,
  ArrowLeft,
  Users
} from "lucide-react";

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("all");

  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      stage: "Moderate",
      lastInteraction: "2024-01-18",
      nextSession: "2024-01-20 2:00 PM",
      totalSessions: 8,
      status: "Active",
      notes: "Making good progress with anxiety management techniques"
    },
    {
      id: 2,
      name: "Michael Chen",
      stage: "Mild",
      lastInteraction: "2024-01-17",
      nextSession: "2024-01-22 10:00 AM",
      totalSessions: 4,
      status: "Active",
      notes: "Responsive to CBT approach, showing improvement"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      stage: "At Risk",
      lastInteraction: "2024-01-19",
      nextSession: "2024-01-20 4:45 PM",
      totalSessions: 12,
      status: "Requires Attention",
      notes: "Recent setback, needs close monitoring"
    },
    {
      id: 4,
      name: "David Kim",
      stage: "Mild",
      lastInteraction: "2024-01-15",
      nextSession: "Not scheduled",
      totalSessions: 6,
      status: "Inactive",
      notes: "Completed initial treatment goals"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      stage: "Moderate",
      lastInteraction: "2024-01-18",
      nextSession: "2024-01-21 3:30 PM",
      totalSessions: 10,
      status: "Active",
      notes: "Working through relationship issues, good engagement"
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Mild": return "status-positive";
      case "Moderate": return "status-warning";
      case "At Risk": return "status-risk";
      default: return "bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/10 text-success border-success/20";
      case "Requires Attention": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Inactive": return "bg-muted text-muted-foreground border-muted";
      default: return "bg-muted";
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === "all" || patient.stage === filterStage;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to="/counselor/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Patients</h1>
            <p className="text-muted-foreground">Manage your patient relationships and sessions</p>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="card-elevated mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="all">All Stages</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="At Risk">At Risk</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="grid gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="card-elevated hover:shadow-floating transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge className={getStageColor(patient.stage)}>
                          {patient.stage}
                        </Badge>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Last: {new Date(patient.lastInteraction).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      Sessions: {patient.totalSessions}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Clinical Notes:</p>
                  <p className="text-sm">{patient.notes}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      Next session: {patient.nextSession === "Not scheduled" ? (
                        <span className="text-muted-foreground">{patient.nextSession}</span>
                      ) : (
                        <span className="font-medium">{patient.nextSession}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/counselor/chat/${patient.id}`}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/counselor/patient/${patient.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="card-elevated text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-xl mb-2">No patients found</CardTitle>
              <CardDescription>
                {searchTerm || filterStage !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "You don't have any patients assigned yet"
                }
              </CardDescription>
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="card-elevated text-center">
            <CardContent className="p-4">
              <h3 className="text-2xl font-bold text-primary">{patients.length}</h3>
              <p className="text-sm text-muted-foreground">Total Patients</p>
            </CardContent>
          </Card>
          
          <Card className="card-elevated text-center">
            <CardContent className="p-4">
              <h3 className="text-2xl font-bold text-success">
                {patients.filter(p => p.status === "Active").length}
              </h3>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>

          <Card className="card-elevated text-center">
            <CardContent className="p-4">
              <h3 className="text-2xl font-bold text-warning">
                {patients.filter(p => p.stage === "At Risk").length}
              </h3>
              <p className="text-sm text-muted-foreground">At Risk</p>
            </CardContent>
          </Card>

          <Card className="card-elevated text-center">
            <CardContent className="p-4">
              <h3 className="text-2xl font-bold text-secondary">
                {patients.reduce((sum, p) => sum + p.totalSessions, 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientList;