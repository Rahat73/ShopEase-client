import { Navbar } from "@/src/components/shared/navbar/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default AuthLayout;
