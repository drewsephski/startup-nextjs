import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Autoapply", // TODO: Use project name variable
  description: "Sign in to your Autoapply account",
};

export default function SignInPage() {
  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-44">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Sign in to your account
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Login to access your dashboard
              </p>
              <div className="flex justify-center">
                <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
