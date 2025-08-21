import { Skeleton } from "@/contexts/shared/ui/components/shadcn/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/contexts/shared/ui/components/shadcn/table";
import { cn } from "@/lib/utils";

const data = [...Array(10)].map((_, i) => ({ id: i.toString() }));
const CategoriesSkeleton = () => {
  return (
    <div className="mb-8 relative w-full border rounded-xl">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Skeleton className="h-3.5 w-[15px]" />
            </TableHead>
            <TableHead className="w-[400px]">
              <Skeleton className="h-3.5 w-[60%]" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="w-full">
          {data?.map((row) => (
            <TableRow key={row.id} className="h-[40px] md:h-[45px] cursor-pointer select-text">
              <TableCell className="w-[50px]">
                <Skeleton className={cn("h-3.5 w-[15px]")} />
              </TableCell>

              <TableCell className="w-[400px]">
                <Skeleton className={cn("h-3.5 w-[60%]")} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesSkeleton;
