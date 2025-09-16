import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Calendar,
  MessageCircle,
  Award,
  Users
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import counselor1 from "@/assets/counselor-1.jpg";
import counselor2 from "@/assets/counselor-2.jpg";
import counselor3 from "@/assets/counselor-3.jpg";

const CounselorList = () => {
  const navigate = useNavigate();
  const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null);
  
  const pendingSession = JSON.parse(localStorage.getItem("pendingSession") || "{}");

  const counselors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Trauma", "Relationship Issues"],
      experience: "8 years",
      rating: 4.9,
      reviewCount: 127,
      avatar: counselor2,
      availability: "Available today",
      price: "$120/session",
      description: "Dr. Johnson specializes in cognitive behavioral therapy and has extensive experience helping clients with anxiety and depression.",
      nextAvailable: "Today, 2:00 PM"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Couples Therapy", "Family Issues", "Communication", "Stress Management"],
      experience: "12 years",
      rating: 4.8,
      reviewCount: 203,
      avatar: counselor3,
      availability: "Available tomorrow",
      price: "$140/session",
      description: "Dr. Chen focuses on relationship dynamics and family systems therapy with a compassionate, solution-focused approach.",
      nextAvailable: "Tomorrow, 10:00 AM"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Licensed Clinical Social Worker",
      specialties: ["PTSD", "Grief", "Addiction", "Mindfulness"],
      experience: "6 years",
      rating: 4.7,
      reviewCount: 89,
      avatar: counselor1,
      availability: "Available this week",
      price: "$100/session",
      description: "Dr. Rodriguez combines traditional therapy with mindfulness techniques to help clients process trauma and develop coping strategies.",
      nextAvailable: "Friday, 3:00 PM"
    }
  ];

  const handleSelectCounselor = (counselorId: number) => {
    const counselor = counselors.find(c => c.id === counselorId);
    if (!counselor) return;

    // Store selected counselor
    localStorage.setItem("selectedCounselor", JSON.stringify(counselor));
    
    toast({
      title: "Counselor selected!",
      description: `You've chosen ${counselor.name}. Proceeding to booking confirmation.`,
    });

    // Navigate to counselor detail/booking page
    navigate(`/user/counselor/${counselorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/user/book-session")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Choose Your Counselor</h1>
            <p className="text-muted-foreground">
              {pendingSession.sessionName && (
                <>Session: <span className="font-medium">{pendingSession.sessionName}</span> • </>
              )}
              {pendingSession.date && (
                <>Date: <span className="font-medium">{pendingSession.date}</span></>
              )}
            </p>
          </div>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {counselors.map((counselor) => (
            <Card 
              key={counselor.id} 
              className={`card-elevated hover:shadow-floating transition-all duration-300 cursor-pointer ${
                selectedCounselor === counselor.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedCounselor(counselor.id)}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={counselor.avatar} alt={counselor.name} />
                    <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{counselor.name}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground/80">
                          {counselor.title}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{counselor.rating}</span>
                          <span className="text-muted-foreground text-sm">({counselor.reviewCount})</span>
                        </div>
                        <p className="text-lg font-semibold text-primary">{counselor.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>{counselor.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{counselor.availability}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      {counselor.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {counselor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="bg-primary/10 text-primary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span>Next available: <span className="font-medium">{counselor.nextAvailable}</span></span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/user/chat/${counselor.id}`);
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCounselor(counselor.id);
                      }}
                      className="bg-gradient-primary hover:shadow-elevated transition-all duration-300"
                    >
                      Select Counselor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="max-w-4xl mx-auto mt-8 card-elevated bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Need Help Choosing?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Not sure which counselor is right for you? Consider their specialties, availability, and approach. 
              You can also start with a chat to get a feel for their communication style before booking a session.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CounselorList;