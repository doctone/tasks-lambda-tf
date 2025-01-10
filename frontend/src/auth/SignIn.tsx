import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "./authContext";

type FormValues = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { signIn: fireBaseSignIn, error } = useAuth();
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = async (data: FormValues) => {
    await fireBaseSignIn({ ...data, displayName: "test" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <form onSubmit={form.handleSubmit(signIn)}>
        <Card.Root className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <Card.Body className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                className="w-full"
                {...form.register("email")}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                className="w-full"
                {...form.register("password")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              type="submit"
            >
              Sign in
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
          </Card.Body>
          <CardFooter>
            <p className="text-center text-sm text-gray-600 w-full">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card.Root>
        {error && (
          <div className="flex justify-center mt-5">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};
