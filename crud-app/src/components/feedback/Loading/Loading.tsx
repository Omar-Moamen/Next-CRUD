import { TError, TLoading } from "../../../types/shared"
import ErrorFeedback from "../ErrorFeedback/ErrorFeedback";
import LottieHandler from "../LottieHandler/LottieHandler";

type TLoadingProps = {
   status: TLoading;
   children: React.ReactNode;
   error: TError;
   size?: string;
}

const Loading = ({ children, status, error, size = "200px" }: TLoadingProps) =>
{

   if (status === true)
   {
      return <LottieHandler type="loading" width={size} />
   }

   if (error)
   {
      return <ErrorFeedback error={error} />
   }

   return (
      <>
         {children}
      </>
   )
}

export default Loading
