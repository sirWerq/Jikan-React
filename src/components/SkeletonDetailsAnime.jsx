import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDetailsAnime = () => {
  return (
    <div className="w-full h-full">
      <div className="border-b-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div>
        <div className="py-3 grid grid-cols-1 md:grid-cols-1fr-3fr gap-4">
          <div className="flex flex-wrap rounded-sm gap-2 border">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="px-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="border-y-2 flex items-center justify-center gap-24 p-10 rounded-md">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="border-y-2 flex items-start justify-center gap-24 p-5 rounded-md">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
        <div className="cek">
          <div className="border-y-2 gap-24 p-5 rounded-md">
            <Skeleton className="h-4 w-[200px]" />
            <table className="table-auto border-collapse border border-slate-400 w-full">
              <tbody>
                {[...new Array(24)].map((_, index) => (
                  <tr key={index} className="flex border border-slate-400">
                    <td className="flex w-[50%] justify-start gap-3">
                      <div>
                        <Skeleton className="h-12 w-12 rounded-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </td>
                    <td className="flex w-[50%] justify-end gap-3">
                      <div className="text-end">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                      <div>
                        <Skeleton className="h-12 w-12 rounded-full" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetailsAnime;
