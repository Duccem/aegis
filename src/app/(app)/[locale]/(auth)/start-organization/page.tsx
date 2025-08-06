import GoToHome from "@/components/auth/go-to-home";
import OrganizationForm from "@/components/auth/organization-form";

const Page = () => {
  return (
    <div className="flex  justify-center items-center h-full w-full">
      <div className="flex flex-col items-start justify-center w-full md:w-2/3 p-10 md:p-0 h-full gap-4">
        <GoToHome />
        <h1 className="text-5xl">Organization start</h1>
        <p className=" text-muted-foreground">
          To complete your registration, please enter the organization name you wish to create.
        </p>
        <OrganizationForm />
      </div>
    </div>
  );
};

export default Page;
