import CreateNewProduct from "@/components/product/create";

const Page = () => {
  return (
    <div className="flex flex-col h-screen p-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold ">Product Page</h2>
        <CreateNewProduct />
      </div>
    </div>
  );
};

export default Page;
