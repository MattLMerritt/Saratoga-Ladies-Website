const path = require(`path`);

exports.createPages = async ({graphql, actions, reporter}) => {
  const { createPage } = actions
  const PostTemplate = path.resolve('./src/templates/post-template.js');
  const PageTemplate = path.resolve('./src/templates/page-template.js');

  const result = await graphql(`
  {
    pages {
      edges {
        node {
          id
          uri
          slug
          status
          template {
            templateName
          }
          title
          content
        }
      }
    }
  }
 `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const SitePages = result.data.allWpPage.edges;
  SitePages.forEach(page => {
    createPage({
      path: page.node.uri,
      component: PageTemplate,
      context: page.node,
    });
  });


  // createPage({
  //   path: "/using-dsg",
  //   component: require.resolve("./src/templates/using-dsg.js"),
  //   context: {},
  //   defer: true,
  // })
};

