import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTabelTopAnime = () => {
  return (
    <div className="mt-3 border rounded-md p-2 shadow-md">
      <h1 className="text-lg font-semibold p-4">Top Anime</h1>
      <div>
        <Table>
          <TableCaption className="font-semibold">
            <div className="flex w-full h-full justify-center items-center">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-12" />
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-[250px]" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-[250px]" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-[250px]" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-[250px]" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...new Array(25)].map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-12 w-12" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SkeletonTabelTopAnime;
