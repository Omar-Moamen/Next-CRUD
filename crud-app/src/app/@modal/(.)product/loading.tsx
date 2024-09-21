import classes from './loading.module.css';
const loading = () =>
{
   return (
      <p className={classes.loadingStyles}>
         Fetching data...
      </p>
   )
}

export default loading
