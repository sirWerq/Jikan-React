import { Skeleton } from "./ui/skeleton";

const SkeletonSearch = () => {
  return (
    <div className="w-full h-full">
      <div className="p-2">
        <h2 className="font-semibold border-b-2">search results: {name}</h2>
      </div>

      {[...new Array(10)].map((anime, index) => (
        <div key={index} className="flex gap-4 w-full p-2 border-b-2">
          <div className="md:w-[10%] w-[30%]">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <div className="md:w-[90%] w-[70%]">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center items-center">
        <Skeleton className="h-12 w-12" />
        <Skeleton className="h-12 w-12" />
      </div>
    </div>
  );
};

export default SkeletonSearch;
