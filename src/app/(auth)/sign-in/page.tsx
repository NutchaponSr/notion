import { SignInForm } from "@/features/auth/components/sign-in-form";
import { AuthWrapper } from "@/features/auth/components/auth-wrapper";

const SignInPage = () => {
  return (
    <AuthWrapper 
      title="Sign In" 
      description="Log in to your Notion account"
    >
      <SignInForm />
    </AuthWrapper>
  );
}

export default SignInPage;