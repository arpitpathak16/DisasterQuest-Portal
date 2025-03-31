
import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, UserPlus } from 'lucide-react';

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ open, onOpenChange }) => {
  const { signIn, signInAsGuest } = useUser();
  const [name, setName] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      signIn(name.trim());
      onOpenChange(false);
    }
  };

  const handleGuestSignIn = () => {
    signInAsGuest();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to DisasterQuest</DialogTitle>
          <DialogDescription>
            Sign in to track your progress and earn points in the disaster management game.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSignIn}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleGuestSignIn}
              className="w-full sm:w-auto"
            >
              <User className="mr-2 h-4 w-4" />
              Continue as Guest
            </Button>
            <Button 
              type="submit" 
              disabled={!name.trim()} 
              className="w-full sm:w-auto"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
