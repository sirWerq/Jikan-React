import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardSeasonAnime = () => {
  return (
    <div className="mt-3 border rounded-md shadow-md">
      <div className="flex justify-around mb-4">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="text-lg font-semibold p-4 flex justify-center">
        <Skeleton className="h-4 w-[250px] " />
      </div>
      <div className="w-full h-full grid lg:grid-cols-3 md:grid-cols-2 gap-3">
        {[...new Array(24)].map((_, index) => (
          <div className="shadow-sm h-[400px]" key={index}>
            <Card className="h-full">
              <CardHeader className="h-[20%] p-4 text-center">
                <CardTitle>
                  <Skeleton className="h-4 w-[200px]" />
                </CardTitle>
              </CardHeader>
              <div className="flex h-[60%]">
                <CardContent className="flex-1 w-full">
                  <Skeleton className="h-[200px] w-[150px] rounded-md" />
                </CardContent>
                <CardContent className="flex-[2] hover:overflow-auto overflow-hidden">
                  <Skeleton className="h-4 w-[100px] mt-2" />
                  <Skeleton className="h-4 w-[100px] mt-2" />
                  <Skeleton className="h-4 w-[100px] mt-2" />
                  <Skeleton className="h-4 w-[100px] mt-2" />
                </CardContent>
              </div>
              <div className="flex justify-center items-center mt-4">
                <CardFooter>
                  <Skeleton className="h-4 w-[50px]" />
                </CardFooter>
                <CardFooter>
                  <Skeleton className="h-4 w-[50px]" />
                </CardFooter>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="p-4 flex justify-center items-center">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonCardSeasonAnime;
