
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="h-10 w-10 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for: {location.pathname}
        </p>
        
        <div className="pt-4">
          <Button onClick={() => navigate("/")} size="lg">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
