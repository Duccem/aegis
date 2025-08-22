import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BillingSection from "@/contexts/auth/organization/ui/components/billing";
import ProfileAccount from "@/contexts/auth/user/ui/components/profile/account";
import ChangePasswordForm from "@/contexts/auth/user/ui/components/profile/password";
const Page = () => {
  return (
    <div className="w-full flex flex-col gap-6 p-9">
      <div>
        <p className="text-4xl font-semibold">Profile</p>
        <p className=" text-muted-foreground">Manage your profile settings and preferences here.</p>
      </div>
      <Tabs defaultValue="account" className="">
        <TabsList className="bg-transparent gap-3 ">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent   data-[state=active]:border-b-primary  data-[state=active]:border-b-2 px-2"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:border-b-2  data-[state=active]:border-primary   px-2"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:border-b-2  data-[state=active]:border-primary   px-2"
          >
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileAccount />
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-12">
              <ChangePasswordForm />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="billing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <BillingSection />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
