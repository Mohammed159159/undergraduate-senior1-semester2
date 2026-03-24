// API Key for metadata fetching
const apiKey = "pk_0c552201a81e5e41f4acc4c283d00b80202857f7";

// Helper function moved from rename.js
const getUrlMetadata = async (url) => {
  const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${apiKey}`;
  try {
    let response = await fetch(apiUrl);
    if (!response.ok) {
      console.error("JSONLink API error:", response.status);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

const embedReadable = async (
  articleTitle, // This is the (potentially bad) title from ReadItLater
  previewURL,
  siteName,
  articleURL,
  tp
) => {
  let frontmatter;
  let body;
  let finalTitle; // This will be used for the rename

  // --- Logic for types that DON'T need an API call ---

  // 1. PDF Links
  if (articleURL.toLowerCase().includes("pdf")) {
    if (!articleURL.toLowerCase().endsWith(".pdf"))
      articleURL = `${articleURL}.pdf`;

    // Logic from rename.js: Use the filename as the title
    finalTitle = articleURL.split("/").pop().split(".pdf")[0];

    frontmatter = `---
tags:
- resources/articles
annotation-target: ${articleURL}
---`;
    body = `<iframe src="https://docs.google.com/gview?url=${articleURL}&embedded=true" style="width:100%; aspect-ratio:1" frameborder="0" allow-popups-to-escape-sandbox></iframe>`;
  }
  // 2. Kosmik Links
  else if (articleURL.includes("play.kosmik.app")) {
    // Logic from rename.js: Prompt the user for the title
    finalTitle = await tp.system.prompt("Enter Kosmik name");
    if (!finalTitle) finalTitle = "Untitled Kosmik"; // Handle cancel

    frontmatter = `---
tags:
- resources/kosmiks
---`;
    body = `| [Open Original](${articleURL}) | [Open in App](file://C:/Users/Mohammed%20Hany/AppData/Roaming/Microsoft/Windows/Start%20Menu/Programs/Kosmik.lnk) |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
<iframe src="${articleURL}" style="width:100%; aspect-ratio:0.7"></iframe>`;
  }
  // 3. Google Drive Folders
  else if (
    articleURL.includes("drive.google.com") &&
    articleURL.includes("/folders/")
  ) {
    // Folders don't have good metadata from the API, so we'll just use the
    // title from ReadItLater (which is what your original script did).
    finalTitle = articleTitle; 

    frontmatter = `---
tags:
- resources/folders
---`;
    body = `\`\`\`embed
title: "${articleTitle}"
image: "https://zeevector.com/wp-content/uploads/Google-Drive-Logo-Transparent.png"
description: "Google Drive Folder"
url: "${articleURL}"
\`\`\``;
  }

  // --- Logic for types that DO need an API call ---
  
  else {
    // **THE OPTIMIZATION**: Make ONE API call for all remaining types
    const metadata = await getUrlMetadata(articleURL);

    // Use the fetched title. Fall back to the ReadItLater title if API fails.
    finalTitle = metadata?.title || articleTitle || "Untitled";

    // Now, build the content based on the URL
    
    // 4. Google Drive Files
    if (
      articleURL.includes("drive.google.com") &&
      articleURL.includes("/file/d/")
    ) {
      frontmatter = `---
tags:
- resources/articles
annotation-target: https://drive.google.com/uc?export=download&id=${
        articleURL.split("/file/d/")[1].split("/")[0]
      }
annotation-target-type: pdf
---`;
      body = `| [Open Original](${articleURL}) |
| ------------------------------------------ |
<iframe src="https://drive.google.com/file/d/${
        articleURL.split("/file/d/")[1].split("/")[0]
      }/preview" style="width:100%; aspect-ratio:1" frameborder="0" allow-popups-to-escape-sandbox></iframe>`;
    }
    // 5. YouTube Playlists
    else if (articleURL.includes("youtube.com/playlist?list=")) {
      const playlistId = articleURL.split("?list=")[1].split("&")[0];
      frontmatter = `---
tags:
- resources/videos
---`;
      // We use the 'finalTitle' from the API in the iframe title
      body = `<iframe width="100%" height="100%" max-height="400px" style="aspect-ratio:1.76991 / 1" src="https://www.youtube.com/embed/videoseries?list=${playlistId}" title="${finalTitle}" frameborder="0"sandbox="allow-forms allow-presentation allow-same-origin allow-popups-to-escape-sandbox allow-scripts allow-modals allow-popups" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }
    // 6. Default Web Article
    else {
      frontmatter = `---
tags:
- resources/articles
---`;
      // **BONUS**: We now use the *correct* metadata in the embed block too!
      body = `\`\`\`embed
title: "${finalTitle}"
image: "${
        metadata?.image || // Use fetched image
        previewURL || // Fallback to ReadItLater image
        "https://blog.tubikstudio.com/wp-content/uploads/2020/05/lumen-museum-website-design.jpg"
      }"
description: "${
        metadata?.description || // Use fetched description
        siteName || // Fallback to ReadItLater sitename
        "Web Article"
      }"
url: "${articleURL}"
\`\`\``;
    }
  }

  // --- Perform the rename right before finishing ---

  if (finalTitle) {
    // **IMPORTANT**: Sanitize the title to make it a valid filename
    const sanitizedTitle = finalTitle
      .replace(/[\\/:*?"<>|]/g, "-") // Replace invalid characters
      .replace(/\s+/g, " "); // Condense whitespace
    
    await tp.file.rename(sanitizedTitle);
  }

  // Return the content for the note body
  return `${frontmatter}\n\n${body}\n`;
};

module.exports = embedReadable;