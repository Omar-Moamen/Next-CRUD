import { Box, Divider, Typography } from "@mui/material"

type TFormProps = {
   children: React.ReactNode;
   heading?: string;
   className?: string;
   divider?: boolean;
   onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
}

const Form = ({
   children,
   heading,
   className,
   divider = true,
   onSubmit
}: TFormProps) =>
{

   return (
      <Box
         component="form"
         className={className}
         onSubmit={onSubmit}
      >
         <Typography variant="h5" component="h5" color="primary">
            {heading}
         </Typography>
         {divider && <Divider sx={{ mb: "20px" }} />}
         {children}
      </Box>
   )
}

export default Form;
