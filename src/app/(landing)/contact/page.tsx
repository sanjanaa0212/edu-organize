import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Contact us</CardTitle>
          <CardDescription className="text-xs md:text-sm">Write to us</CardDescription>
        </CardHeader>
        <CardContent>
          Contact at <Link href={"mailto:02b3akshay@gmail.com"}>02b3akshay@gmail.com</Link>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-center border-t pt-4">
            <p className="text-muted-foreground text-center text-xs">
              <Link href="/" className="underline">
                Back to Home
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
