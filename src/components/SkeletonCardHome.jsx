import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardHome = () => {
  return (
    <div className="mt-3 border rounded-md p-2 shadow-md">
      <h1 className="text-lg font-semibold p-4">This Season</h1>
      <div className="w-full h-full grid lg:grid-cols-3 md:grid-cols-2 gap-3">
        {[...Array(6)].map((_, index) => (
          <div className="shadow-sm h-[370px]" key={index}>
            <Card className="h-full">
              <CardHeader className="h-[20%] p-4 text-center">
                <CardTitle>
                  <Skeleton className="h-4 w-[250px]" />
                </CardTitle>
              </CardHeader>
              <div className="flex h-[60%]">
                <CardContent className="flex-1 w-full">
                  <Skeleton className="h-[200px] w-[200px] rounded-md" />
                </CardContent>
                <CardContent className="flex-[2]">
                  <Skeleton className="h-4 w-[150px] mt-2" />
                  <Skeleton className="h-4 w-[150px] mt-2" />
                  <Skeleton className="h-4 w-[150px] mt-2" />
                  <Skeleton className="h-4 w-[150px] mt-2" />
                </CardContent>
              </div>
              <div className="flex justify-center items-center mt-4">
                <CardFooter>
                  <Skeleton className="h-4 w-[100px]" />
                </CardFooter>
                <CardFooter>
                  <Skeleton className="h-4 w-[100px]" />
                </CardFooter>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center p-2">
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonCardHome;
