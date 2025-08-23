import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { DataTable } from "./components/data-table";
import { SectionCards } from "./components/section-cards";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-0 py-4 md:py-6">
          <SectionCards />
          <ChartAreaInteractive />
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
