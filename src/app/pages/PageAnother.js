import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SEO from "../components/Seo";

const PageAnother = (props) => {
  const match = useRouteMatch();

  return (
    <>
      <SEO title="Page Another" />
      <div>
        This is for another page.
        <Switch>
          <Route
            path={`${match.path}/:id`}
            render={() => <h2>Another Child</h2>}
          />
          {/* <Route path={`${match.path}/:id`} component={PageAnotherChild} /> */}
        </Switch>
      </div>
    </>
  );
};

// const PageAnotherChild = (props) => {

// 	const match = useRouteMatch();

// 	return (
// 		<div>
// 			<Helmet>
// 				<title>Page Another child</title>
// 			</Helmet>
// 			<h2>Another Child</h2>
// 			<Switch>
// 				<Route path={`${match.path}/:sub`} render={(props) => <h1>Another Child sub</h1>} />
// 			</Switch>
// 		</div>
// 	);
// }

export default PageAnother;
