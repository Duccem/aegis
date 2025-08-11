"use client";
import { authClient } from "@/lib/auth/client";
import { useQuery } from "@tanstack/react-query";
import ProfileAvatar from "./avatar";
import { DeleteAccountSection } from "./delete";
import Loading from "./loading";
import Name from "./name";

const ProfileAccount = () => {
  const { data, isPending } = useQuery({
    queryKey: ["profile-account"],
    queryFn: async () => {
      return await authClient.getSession();
    },
    refetchOnWindowFocus: false,
  });
  if (!data || isPending) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col gap-12">
      <ProfileAvatar image={data.data?.user.image ?? ""} />
      <Name name={data.data?.user.name ?? ""} />
      <DeleteAccountSection />
    </div>
  );
};

export default ProfileAccount;
