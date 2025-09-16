import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BookSession = () => {
  const [sessionName, setSessionName] = useState("");
  const [date, setDate] = useState<Date>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionName || !date) {
      toast({
        title: "Please fill all fields",
        description: "Session name and date are required",
        variant: "destructive",
      });
      return;
    }

    // Store session data for counselor selection
    localStorage.setItem("pendingSession", JSON.stringify({
      sessionName,
      date: format(date, "yyyy-MM-dd"),
    }));

    toast({
      title: "Session details saved!",
      description: "Now choose your counselor",
    });

    // Navigate to counselor selection
    navigate("/user/counselors");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/user/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Book a Session</h1>
            <p className="text-muted-foreground">Schedule your mental health appointment</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>
                Provide basic information about your session and preferred date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionName">Session Name</Label>
                  <Input
                    id="sessionName"
                    type="text"
                    placeholder="e.g., Anxiety Support, General Counseling, Stress Management"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Give your session a descriptive name to help your counselor prepare
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal text-lg h-12",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred date. Available time slots will be shown after selecting a counselor.
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">What happens next?</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Choose a counselor from our licensed professionals</li>
                    <li>Select an available time slot on your preferred date</li>
                    <li>Confirm your booking and receive a confirmation email</li>
                    <li>Join your session at the scheduled time</li>
                  </ol>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-primary hover:shadow-elevated transition-all duration-300"
                  size="lg"
                >
                  Continue to Counselor Selection
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookSession;