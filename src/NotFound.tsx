import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound(): JSX.Element {
  return (
    <div className="not-found">
      <Grid container alignItems="center" justifyContent="center">
        <Grid
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          className="not-found-grid"
        >
          <h1>404</h1>
          <h2>Page not found</h2>
          <p>
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
          <Button variant="contained" color="primary" component={Link} to="/">
            {" "}
            Go back to home page
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
