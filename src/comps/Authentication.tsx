import { UserIcon } from "@/assets/Icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Login from "./Login";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./Register";

export default function Authentication() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="p-0">
          <UserIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="login" className="py-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="register">
              <Register />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
