"use client";

import { authClient } from "@/contexts/shared/infrastructure/auth/client";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/contexts/shared/ui/components/shadcn/dialog";
import { Label } from "@/contexts/shared/ui/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/contexts/shared/ui/components/shadcn/radio-group";
import { Check, CreditCard } from "lucide-react";
import { useState } from "react";

export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}
export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "Free",
    description: "Aegis free plan for individuals",
    features: ["500 AI completions by month", "50 Invoice sendings by month", "200 products"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$25/month",
    description: "Aegis pro plan for businesses on growth",
    features: ["10000 AI completions by month", "300 Invoice sendings by month", "1000 products"],
  },
];

const Prices = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("free");
  const [open, setOpen] = useState(false);
  const handleSubscribe = async () => {
    const organizationId = (await authClient.organization.list())?.data?.[0]?.id;
    await authClient.checkout({
      slug: selectedPlan ?? "free",
      referenceId: organizationId,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upgrade to Pro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose your plan</DialogTitle>
          <DialogDescription>
            Select the plan that best fits your needs and start enjoying the benefits of our
            service.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup
          value={selectedPlan ?? ""}
          onValueChange={setSelectedPlan}
          className="grid  grid-cols-1 gap-4 py-4"
        >
          {plans.map((plan) => {
            return (
              <div key={plan.id} className="relative h-full">
                <RadioGroupItem value={plan.id} id={plan.id} className="peer sr-only" />
                <Label
                  htmlFor={plan.id}
                  className={`flex flex-col sm:flex-row items-start p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5  h-full`}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-base font-semibold">{plan.name}</div>
                      <div className="text-base font-bold text-primary">{plan.price}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                    <ul className="mt-2 space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
        <DialogFooter>
          <Button disabled={!selectedPlan} className="w-full sm:w-auto" onClick={handleSubscribe}>
            <CreditCard className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Prices;
