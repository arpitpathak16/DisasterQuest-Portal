
import React from 'react';
import { Bookmark, HelpCircle, BookOpen, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Help Center</h1>
            <p className="mt-3 text-muted-foreground">Find answers to common questions about disasters and emergency preparedness</p>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-preimpact/20 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-preimpact" />
                </div>
                <CardTitle>Preparation Guides</CardTitle>
                <CardDescription>Learn how to prepare for different types of disasters</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="hover:underline cursor-pointer">Earthquake Preparation</li>
                  <li className="hover:underline cursor-pointer">Hurricane Safety</li>
                  <li className="hover:underline cursor-pointer">Flood Preparedness</li>
                  <li className="hover:underline cursor-pointer">Fire Safety</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-emergency/20 flex items-center justify-center mb-2">
                  <AlertCircle className="h-6 w-6 text-emergency" />
                </div>
                <CardTitle>Emergency Response</CardTitle>
                <CardDescription>Critical actions during different disaster situations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="hover:underline cursor-pointer">First Aid Basics</li>
                  <li className="hover:underline cursor-pointer">Evacuation Procedures</li>
                  <li className="hover:underline cursor-pointer">Emergency Communications</li>
                  <li className="hover:underline cursor-pointer">Shelter-in-Place Guidelines</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-recovery/20 flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-black" />
                </div>
                <CardTitle>Recovery Resources</CardTitle>
                <CardDescription>Support and resources for post-disaster recovery</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="hover:underline cursor-pointer">Disaster Assistance Programs</li>
                  <li className="hover:underline cursor-pointer">Mental Health Support</li>
                  <li className="hover:underline cursor-pointer">Insurance Claims</li>
                  <li className="hover:underline cursor-pointer">Community Rebuilding</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-capacity/20 flex items-center justify-center mb-2">
                  <MapPin className="h-6 w-6 text-capacity" />
                </div>
                <CardTitle>Local Resources</CardTitle>
                <CardDescription>Find emergency services and support in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="hover:underline cursor-pointer">Emergency Contacts</li>
                  <li className="hover:underline cursor-pointer">Evacuation Routes</li>
                  <li className="hover:underline cursor-pointer">Shelter Locations</li>
                  <li className="hover:underline cursor-pointer">Community Support Groups</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What should be in my emergency kit?</AccordionTrigger>
                <AccordionContent>
                  <p>An emergency kit should include:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Water (one gallon per person per day for at least three days)</li>
                    <li>Non-perishable food (at least a three-day supply)</li>
                    <li>Battery-powered or hand crank radio</li>
                    <li>Flashlight and extra batteries</li>
                    <li>First aid kit</li>
                    <li>Whistle to signal for help</li>
                    <li>Dust mask, plastic sheeting, and duct tape</li>
                    <li>Moist towelettes, garbage bags, and plastic ties</li>
                    <li>Wrench or pliers to turn off utilities</li>
                    <li>Manual can opener</li>
                    <li>Local maps</li>
                    <li>Cell phone with chargers and a backup battery</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I create a family emergency plan?</AccordionTrigger>
                <AccordionContent>
                  <p>A family emergency plan should include:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Meeting locations (both in your neighborhood and outside your neighborhood)</li>
                    <li>Emergency contact information for all family members</li>
                    <li>Out-of-town contact person</li>
                    <li>Evacuation routes from your home and neighborhood</li>
                    <li>Location of emergency supplies and go-bags</li>
                    <li>Special needs considerations for family members</li>
                    <li>Plan for pets and service animals</li>
                    <li>Important document backup</li>
                  </ul>
                  <p className="mt-2">Practice your plan regularly with all family members.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What should I do during an earthquake?</AccordionTrigger>
                <AccordionContent>
                  <p className="font-medium">If you are inside:</p>
                  <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
                    <li>DROP to the ground</li>
                    <li>Take COVER by getting under a sturdy desk or table</li>
                    <li>HOLD ON until the shaking stops</li>
                    <li>Stay away from windows, outside doors, and walls</li>
                    <li>Stay inside until the shaking stops and it's safe to go outside</li>
                  </ul>
                  
                  <p className="font-medium">If you are outside:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Stay away from buildings, streetlights, and utility wires</li>
                    <li>Once in the open, stay there until the shaking stops</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How can I make my home more disaster-resistant?</AccordionTrigger>
                <AccordionContent>
                  <p>To make your home more disaster-resistant:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Secure heavy furniture and appliances to walls</li>
                    <li>Install storm shutters or impact-resistant windows</li>
                    <li>Reinforce garage doors</li>
                    <li>Clear debris from gutters and downspouts</li>
                    <li>Trim trees and shrubs away from your home</li>
                    <li>Check roof integrity regularly</li>
                    <li>Elevate utilities in flood-prone areas</li>
                    <li>Create defensible space if you live in wildfire-prone areas</li>
                    <li>Install smoke detectors on every level</li>
                    <li>Know how to shut off utilities</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Where can I learn more about disaster preparedness?</AccordionTrigger>
                <AccordionContent>
                  <p>You can learn more about disaster preparedness from:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Federal Emergency Management Agency (FEMA)</li>
                    <li>The American Red Cross</li>
                    <li>Your state's emergency management agency</li>
                    <li>Local community emergency response teams (CERT)</li>
                    <li>Ready.gov</li>
                    <li>Local public health departments</li>
                    <li>Community emergency preparedness workshops</li>
                  </ul>
                  <p className="mt-2">Consider taking first aid and CPR classes from the Red Cross or a similar organization.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
