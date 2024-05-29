import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTabelHome = () => {
  return (
    <div className="mt-3 border rounded-md p-2 shadow-md">
      <h1 className="text-lg font-semibold p-4">Top Anime</h1>
      <div>
        <Table>
          <TableCaption className="font-semibold">
            <NavLink to="/topAnime">
              <Skeleton className="h-4 w-[30%]" />
            </NavLink>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-[20%]" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-[20%]" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-[20%]" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-[20%]" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...new Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[10%]" />
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-12 w-[10%]" />
                    <Skeleton className="h-4 w-[20%]" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[20%]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[20%]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SkeletonTabelHome;
