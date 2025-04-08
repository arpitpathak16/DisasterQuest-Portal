import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Info,
  AlertTriangle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";

// Types for our messages
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your DisasterQuest assistant. Ask me anything about disaster management, preparation, or safety!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample disaster management knowledge base for quick responses
  const knowledgeBase = [
    {
      keywords: ["flood", "flooding", "water"],
      response:
        "During flooding, move to higher ground immediately. Never walk, swim, or drive through flood waters. Just 6 inches of moving water can knock you down, and one foot of moving water can sweep your vehicle away.",
    },
    {
      keywords: ["earthquake", "tremor", "quake"],
      response:
        "During an earthquake, remember to DROP, COVER, and HOLD ON. Drop to your hands and knees, cover your head and neck, and hold on to your shelter until the shaking stops.",
    },
    {
      keywords: ["hurricane", "storm", "cyclone", "typhoon"],
      response:
        "For hurricanes, prepare an emergency kit and evacuation plan. Stay informed through official channels and evacuate if authorities recommend it. Secure your home by covering windows and bringing in outdoor furniture.",
    },
    {
      keywords: ["fire", "wildfire", "burning"],
      response:
        "If a fire occurs, remember to GET OUT, STAY OUT, and CALL FOR HELP. Create a fire escape plan with two ways out of each room. Test smoke alarms monthly and replace batteries annually.",
    },
    {
      keywords: ["kit", "emergency kit", "supplies", "prepare"],
      response:
        "An emergency kit should include: water (one gallon per person per day), non-perishable food, battery-powered radio, flashlight, first aid kit, extra batteries, whistle, dust mask, plastic sheeting, duct tape, moist towelettes, garbage bags, wrench or pliers, manual can opener, local maps, and cell phone with chargers.",
    },
    {
      keywords: ["evacuation", "evacuate", "leave"],
      response:
        "When evacuating: secure your home, take your emergency kit, follow recommended evacuation routes, listen to emergency broadcasts, and inform friends/family of your plans and destination.",
    },
    {
      keywords: ["help", "assistance", "contact"],
      response:
        "In a life-threatening emergency, always call your local emergency number (like 911 in the US). For disaster assistance, contact your national emergency management agency or local Red Cross/Red Crescent society.",
    },
  ];

  // Auto-scroll to the bottom of the messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Process the message and generate a response
    setTimeout(async () => {
      const botResponse = await generateResponse(message);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponseOld = (query: string) => {
    // Convert query to lowercase for better matching
    const lowercaseQuery = query.toLowerCase();

    // Check if the query contains any keywords in our knowledge base
    for (const item of knowledgeBase) {
      if (item.keywords.some((keyword) => lowercaseQuery.includes(keyword))) {
        return item.response;
      }
    }

    // Default responses if no keywords match
    const defaultResponses = [
      "I recommend checking official disaster management agencies like FEMA or Red Cross for detailed information on that topic.",
      "That's an important question. Remember that preparation is key to disaster resilience. Make sure you have an emergency plan and supplies ready.",
      "While I don't have specific information on that, I suggest talking to local emergency management officials who can provide guidance tailored to your area.",
      "Great question! Disaster preparedness includes having a plan, building an emergency kit, staying informed about local hazards, and practicing your response.",
      "I don't have complete information on that, but community resilience is built through education, preparation, and working together before, during, and after disasters.",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const ai = new GoogleGenAI({
    apiKey: "Your API Key",
  });

  // async function main() {
  //   const response = await ai.models.generateContent({
  //     model: "gemini-2.0-flash",
  //     contents: "Explain how AI works in a few words",
  //   });
  //   console.log(response.text);
  // }

  // await main();

  const generateResponse = async (query: string) => {
    const updatedHistory = [
      ...chatHistory,
      { role: "user", parts: [{ text: query }] },
    ];

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: updatedHistory,
      config: {
        systemInstruction: `
        You are DisasterQuest, an expert assistant trained in disaster management and emergency response. You must:
      - Help users prepare for, respond to, and recover from disasters.
     - Provide clear, concise, and practical safety advice.
     - consider that the country of user in India
     - give the response in word limit of 200 words
   - Use markdown formatting (like **bold**, _italic_, bullet points, etc.) for better readability.
   - Only answer questions relevant to disaster management, preparation, and safety.
     - Politely avoid irrelevant questions and gently guide the user back to disaster topics.
    `,
      },
    });

    const result = await chat.sendMessage({
      message: query,
    });
    console.log(result);
    const response = await result.text;

    const text = response;
    setChatHistory([...updatedHistory, { role: "model", parts: [{ text }] }]);
    return text;

    //     const response = await ai.models.generateContent({
    //       model: "gemini-2.0-flash",
    //       contents: query,
    //       config: {
    //         systemInstruction: `
    // You are DisasterQuest, an expert assistant trained in disaster management and emergency response. You must:

    // - Help users prepare for, respond to, and recover from disasters.
    // - Provide clear, concise, and practical safety advice.
    // - Use markdown formatting (like **bold**, _italic_, bullet points, etc.) for better readability.
    // - Only answer questions relevant to disaster management, preparation, and safety.
    // - Politely avoid irrelevant questions and gently guide the user back to disaster topics.
    // `,
    //       },
    //     });
    //     console.log(response.text);
    //     return response.text;
  };
  const [showHistory, setShowHistory] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  // const messagesEndRef = useRef<HTMLDivElement>(null);
  // const inputRef = useRef<HTMLInputElement>(null);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  const downloadChatAsPDF = () => {
    setIsPdfGenerating(true);

    // Show toast notification
    toast({
      title: "Generating PDF...",
      description: "Please wait while your conversation is being prepared.",
    });

    // Create temporary visible content for PDF generation
    const tempElement = document.createElement("div");
    tempElement.id = "temp-pdf-content";
    tempElement.style.position = "absolute";
    tempElement.style.left = "0";
    tempElement.style.top = "0";
    tempElement.style.width = "800px";
    tempElement.style.zIndex = "-1000";
    tempElement.style.background = "white";
    tempElement.style.padding = "20px";
    document.body.appendChild(tempElement);

    // Populate with formatted content
    tempElement.innerHTML = `
      <div style="font-family: Arial, sans-serif;">
        <h1 style="color: #1a56db; text-align: center;">DisasterQuest Conversation</h1>
        <p style="text-align: center;">Generated on ${new Date().toLocaleString()}</p>
        <hr style="margin: 20px 0;" />
        ${messages
          .map(
            (msg) => `
          <div style="margin-bottom: 16px; page-break-inside: avoid;">
            <div style="display: flex; align-items: center;">
              <strong style="color: ${msg.isUser ? "#1a56db" : "#047857"};">
                ${msg.isUser ? "You" : "DisasterQuest"}:
              </strong>
              <span style="margin-left: auto; font-size: 12px; color: #6b7280;">
                ${msg.timestamp.toLocaleString()}
              </span>
            </div>
            <div style="padding: 8px; margin-top: 4px; border-radius: 6px; background-color: ${
              msg.isUser ? "#e0e7ff" : "#f3f4f6"
            };">
              ${msg.content.replace(/\n/g, "<br>")}
            </div>
          </div>
        `
          )
          .join("")}
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>In real emergencies, always call your local emergency number.</p>
          <p>DisasterQuest is for informational purposes only.</p>
        </div>
      </div>
    `;

    // Wait for DOM to render and then generate PDF
    setTimeout(() => {
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: "disasterquest_chat.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(tempElement)
        .save()
        .then(() => {
          // Clean up
          document.body.removeChild(tempElement);
          setIsPdfGenerating(false);

          // Show success toast
          toast({
            title: "PDF Downloaded",
            description: "Your conversation has been saved as a PDF.",
          });
        })
        .catch((error) => {
          console.error("PDF generation error:", error);
          setIsPdfGenerating(false);

          // Show error toast
          toast({
            title: "PDF Generation Failed",
            description:
              "There was an error creating your PDF. Please try again.",
            variant: "destructive",
          });
        });
    }, 1000); // Increased timeout to ensure content is fully rendered
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        {/* Chat button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg"
          aria-label="Open chat help">
          <MessageSquare className="h-6 w-6" />
        </Button>

        {/* Chat window */}
        {isOpen && (
          <Card className="absolute bottom-16 right-0 w-80 sm:w-96 shadow-xl animate-fade-in">
            <div className="bg-primary text-primary-foreground p-3 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <h3 className="font-medium">
                  Disaster Helper - dm me anytime :)
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-primary-foreground"
                onClick={() => setIsOpen(false)}>
                <span className="sr-only">Close</span>
                <span aria-hidden="true">&times;</span>
              </Button>
            </div>

            <ScrollArea className="h-80 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.isUser ? "justify-end" : "justify-start"
                    }`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}>
                      {/* <p className="text-sm">{msg.content}</p> */}
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                      <span className="text-xs opacity-70 block mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                      <div className="flex items-center gap-1">
                        <div
                          className="h-2 w-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}></div>
                        <div
                          className="h-2 w-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}></div>
                        <div
                          className="h-2 w-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Ask about disaster management..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !message.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            <div className="flex border-t">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-sm py-2 rounded-none"
                onClick={() => setShowHistory(!showHistory)}>
                {showHistory
                  ? "Hide Conversation History"
                  : "View Full Conversation History"}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-sm py-2 rounded-none border-l"
                onClick={downloadChatAsPDF}>
                Download as PDF
              </Button>
            </div>
            {showHistory && (
              <ScrollArea className="h-64 p-3 border-t">
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <strong>{msg.isUser ? "You" : "DisasterQuest"}:</strong>
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
            <div className="text-xs text-muted-foreground p-2 text-center border-t">
              <div className="flex items-center justify-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span>
                  In real emergencies, always call your local emergency number.
                </span>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div
        id="chat-pdf-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          width: "800px", // Optional: set consistent width for better PDF rendering
        }}>
        <h2>DisasterQuest Conversation</h2>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: "1rem" }}>
            <strong>{msg.isUser ? "You" : "DisasterQuest"}:</strong>
            <div>{msg.content}</div>
            <small>
              {msg.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatbotHelp;
