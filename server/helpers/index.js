// import the manifest generated with the create-react-app build
import manifest from "../../build/asset-manifest.json";

/**
 * function to extract lazy-loaded js and css assets from the manifest
 * @param {string[]} assets
 * @param {string[]} modules
 */
const extractModulesChunks = (assets, modules) => {
  // Styles
  const chunksCss = assets
    .filter((asset) => modules.indexOf(asset.replace(".css", "")) > -1)
    .map((k) => manifest.files[k]);

  // Scripts
  const chunksJs = assets
    .filter((asset) => modules.indexOf(asset.replace(".js", "")) > -1)
    .map((k) => manifest.files[k]);

  return { css: chunksCss, js: chunksJs };
};

/**
 * Attach all chunks (css & js) to html
 *
 * @param {string} htmlData
 */
export const AttachChunksToHtml = (htmlData, modules) => {
  const assets = Object.keys(manifest.files);

  const modulesChunks = extractModulesChunks(assets, modules);

  // Styles
  modulesChunks.css.unshift(manifest.files["main.css"]);
  const stylesBundle = modulesChunks.css.map(
    (filePath) => `<link href="${filePath}" rel="stylesheet" />`
  );

  // Get License Script
  const licenseChunk = Object.values(manifest.files)[assets.length - 1].replace(
    ".LICENSE.txt",
    ""
  );
  modulesChunks.js.unshift(licenseChunk);
  modulesChunks.js.push(manifest.files["main.js"]); // This should be last script
  const scriptsBundle = modulesChunks.js.map(
    (filePath) => `<script src="${filePath}" async></script>`
  );

  return (
    htmlData
      // Remove main chunk style
      .replace(
        `<link href="${manifest.files["main.css"]}" rel="stylesheet">`,
        ""
      )
      // Remove license and main chunk scripts 
      .replace(`<script src="${licenseChunk}"></script>`, "")
      .replace(`<script src="${manifest.files["main.js"]}"></script>`, "")
      // Append the style and script assets
      .replace(
        "</head>",
        stylesBundle.join("\n") + scriptsBundle.join("\n") + "</head>"
      )
  );
};
