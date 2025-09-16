import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, Bot, User, Heart } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AiChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI mental health support assistant. I'm here to listen and provide helpful guidance 24/7. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const aiResponses = [
    "I understand how you're feeling. It's completely normal to have these experiences, and I'm here to support you through this.",
    "That sounds challenging. Can you tell me more about what specifically is causing you to feel this way?",
    "Thank you for sharing that with me. It takes courage to open up about these feelings. Have you considered speaking with a professional counselor?",
    "I hear you, and your feelings are valid. Sometimes it helps to take things one step at a time. What's one small thing you could do today to take care of yourself?",
    "It's important to remember that you're not alone in this. Many people experience similar challenges, and there are effective ways to work through them.",
    "That's a great insight. Self-awareness is an important step in mental wellness. How do you think this awareness might help you moving forward?",
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
            <h1 className="text-3xl font-bold text-foreground">AI Chat Support</h1>
            <p className="text-muted-foreground">24/7 mental health support assistant</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="card-elevated h-[70vh] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">MindCare AI Assistant</CardTitle>
                  <CardDescription>Always here to listen and support</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-success">Online</span>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        {message.sender === "ai" ? (
                          <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          </div>
                        ) : (
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p
                          className={`text-xs mt-1 opacity-70 ${
                            message.sender === "user" ? "text-primary-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isTyping}
                  className="bg-gradient-primary hover:shadow-elevated transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This AI assistant provides support but is not a replacement for professional therapy.
                For crisis situations, please contact emergency services or a mental health professional.
              </p>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-primary" />
                  Need Professional Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  While our AI provides 24/7 support, speaking with a licensed counselor can provide deeper, personalized care.
                </p>
                <Button className="w-full" asChild>
                  <a href="/user/counselors">Book a Session with a Counselor</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-elevated bg-warning/10">
              <CardHeader>
                <CardTitle className="text-lg text-warning">Crisis Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you're experiencing a mental health crisis or having thoughts of self-harm:
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">Call 988 - Suicide & Crisis Lifeline</p>
                  <p className="text-sm text-muted-foreground">Available 24/7 for crisis support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;