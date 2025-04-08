import React from "react";
import { Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-slate-50 border-t">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DisasterQuest</h3>
            <p className="text-sm text-muted-foreground">
              Learning disaster management through gamification. Be prepared,
              stay safe, and have fun along the way.
            </p>
          </div>
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-muted-foreground hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary">
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/challenges"
                  className="text-muted-foreground hover:text-primary">
                  Challenges
                </a>
              </li>
              <li>
                <a
                  href="/leaderboard"
                  className="text-muted-foreground hover:text-primary">
                  Leaderboard
                </a>
              </li>
            </ul>
          </div> */}
          {/* <div> */}
          {/* <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div> */}
          {/* <p className="mt-4 text-sm text-muted-foreground">
              © 2025 DisasterQuest. All rights reserved.
            </p> */}
          {/* </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
