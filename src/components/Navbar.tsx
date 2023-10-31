import Link from "next/link";
import WidthWrapper from "./WidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-slate-950 bg-black/30 backdrop-blur-lg transition-all">
      <WidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-slate-950">
          <Link href="/" className="flex z-40 font-semibold">
            <span>ITools</span>
          </Link>

          <div className=" items-center space-x-4 sm:flex">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
                <UserNavbar
                  name={
                    !user.given_name || !user.family_name
                      ? "Your Account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imgUrl={user.picture ?? ""}
                />
              </>
            ) : (
              <>
                {" "}
                <LoginLink
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  Sign up
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      </WidthWrapper>
    </nav>
  );
};

export default Navbar;
