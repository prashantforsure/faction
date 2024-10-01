import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronRight, FileText, ShieldCheck } from 'lucide-react'

export default function GuidelinesAndTerms() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Guidelines & Terms</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Our Community</CardTitle>
          <CardDescription>
            Please review our guidelines and terms to ensure a positive experience for all users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="guidelines">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guidelines">Community Guidelines</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            </TabsList>
            <TabsContent value="guidelines">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Be Respectful</AccordionTrigger>
                    <AccordionContent>
                      Treat others with respect. No harassment, bullying, or hate speech will be tolerated.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Stay On Topic</AccordionTrigger>
                    <AccordionContent>
                      Keep discussions relevant to the community or subreddit you're posting in.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>No Spam</AccordionTrigger>
                    <AccordionContent>
                      Don't flood the community with repetitive content or advertisements.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Protect Privacy</AccordionTrigger>
                    <AccordionContent>
                      Don't share personal information about yourself or others without consent.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Follow Copyright Laws</AccordionTrigger>
                    <AccordionContent>
                      Only post content that you have the right to share.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="terms">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
                <p className="mb-4">
                  By accessing or using our service, you agree to be bound by these Terms and Conditions.
                </p>
                <h3 className="text-lg font-semibold mb-2">2. User Accounts</h3>
                <p className="mb-4">
                  You are responsible for safeguarding the password you use to access the service and for any activities or actions under your password.
                </p>
                <h3 className="text-lg font-semibold mb-2">3. Content</h3>
                <p className="mb-4">
                  Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service.
                </p>
                <h3 className="text-lg font-semibold mb-2">4. Prohibited Uses</h3>
                <p className="mb-4">
                  You may use our service only for lawful purposes and in accordance with these Terms. You agree not to use the service for any illegal or unauthorized purpose.
                </p>
                <h3 className="text-lg font-semibold mb-2">5. Termination</h3>
                <p className="mb-4">
                  We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.
                </p>
              </ScrollArea>
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Last updated: June 1, 2023</span>
            </div>
            <Button>
              I Agree
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          If you have any questions about these guidelines or terms, please contact our support team.
        </p>
        <Button variant="link" className="mt-2">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Contact Support
        </Button>
      </div>
    </div>
  )
}