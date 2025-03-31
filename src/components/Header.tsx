
import React, { useState } from 'react';
import { Shield, HelpCircle, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import SignInModal from './SignInModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useUser();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="w-full py-4 px-6 bg-white shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 
            className="text-xl md:text-2xl font-bold cursor-pointer" 
            onClick={() => navigate('/')}
          >
            DisasterQuest
          </h1>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button variant="ghost" onClick={() => navigate('/challenges')}>Challenges</Button>
          <Button variant="ghost" onClick={() => navigate('/leaderboard')}>Leaderboard</Button>
          <Button variant="ghost" onClick={() => navigate('/help')}>
            <HelpCircle className="mr-1 h-4 w-4" />
            Help
          </Button>
        </nav>
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2 hidden md:inline-flex"
                onClick={() => setShowSignInModal(true)}
              >
                Login
              </Button>
              <Button 
                size="sm"
                onClick={() => setShowSignInModal(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
              <SignInModal 
                open={showSignInModal} 
                onOpenChange={setShowSignInModal} 
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
