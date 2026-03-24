// --- API Key & Helper ---
const apiKey = "pk_0c552201a81e5e41f4acc4c283d00b80202857f7";

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

// --- Helper to build placeholder content (ONLY for web articles) ---
const buildPlaceholderContent = (title, previewURL, siteName, articleURL) => {
  const frontmatter = `---
tags:
- resources/articles
---`;
  const body = `\`\`\`embed
title: "${title || "Loading..."}"
image: "${
    previewURL ||
    "https://blog.tubikstudio.com/wp-content/uploads/2020/05/lumen-museum-website-design.jpg"
  }"
description: "${siteName || "Fetching metadata..."}"
url: "${articleURL}"
\`\`\``;
  return `${frontmatter}\n\n${body}\n`;
};

// --- Main Function ---
const embedReadable = async (
  articleTitle,
  previewURL,
  siteName,
  articleURL,
  tp
) => {
  let finalTitle;
  let frontmatter;
  let body;

  // --- PART 1: Handle "FAST" types (no network) ---
  // These are created and renamed instantly.

  // 1. PDF Links
  if (articleURL.toLowerCase().includes("pdf")) {
    if (!articleURL.toLowerCase().endsWith(".pdf"))
      articleURL = `${articleURL}.pdf`;
    finalTitle = articleURL.split("/").pop().split(".pdf")[0];
    frontmatter = `---
tags:
- resources/articles
annotation-target: ${articleURL}
---`;
    body = `<iframe src="https://docs.google.com/gview?url=${articleURL}&embedded=true" style="width:100%; aspect-ratio:1" frameborder="0" allow-popups-to-escape-sandbox></iframe>`;
    await tp.file.rename(finalTitle);
    return `${frontmatter}\n\n${body}\n`;
  }

  // 2. Kosmik Links
  if (articleURL.includes("play.kosmik.app")) {
    finalTitle = (await tp.system.prompt("Enter Kosmik name")) || "Untitled Kosmik";
    frontmatter = `---
tags:
- resources/kosmiks
---`;
    body = `| [Open Original](${articleURL}) | [Open in App](file://C:/Users/Mohammed%20Hany/AppData/Roaming/Microsoft/Windows/Start%20Menu/Programs/Kosmik.lnk) |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
<iframe src="${articleURL}" style="width:100%; aspect-ratio:0.7"></iframe>`;
    await tp.file.rename(finalTitle);
    return `${frontmatter}\n\n${body}\n`;
  }

  // 3. Google Drive Folders
  if (
    articleURL.includes("drive.google.com") &&
    articleURL.includes("/folders/")
  ) {
    finalTitle = articleTitle || "Google Drive Folder";
    frontmatter = `---
tags:
- resources/folders
---`;
    body = `\`\`\`embed
title: "${finalTitle}"
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png"
description: "Google Drive Folder"
url: "${articleURL}"
\`\`\``;
    await tp.file.rename(finalTitle.replace(/[\\/:*?"<>|]/g, "-"));
    return `${frontmatter}\n\n${body}\n`;
  }

  // --- PART 2: Handle "SLOW" types (need network for rename) ---

  const currentFile = app.vault.getAbstractFileByPath(tp.file.path(true));
  if (!currentFile) {
    console.error("ReadItLater Error: Could not get target file reference.");
    return;
  }
  
  // Define flags for our logic
  const isDriveFile = articleURL.includes("drive.google.com") && articleURL.includes("/file/d/");
  const isPlaylist = articleURL.includes("youtube.com/playlist?list=");

  // --- Launch the background task ---
  // This will run for Drive Files, Playlists, and Web Articles
  (async () => {
    const metadata = await getUrlMetadata(articleURL);
    
    // 1. RENAME (always)
    const fetchedTitle = metadata?.title || articleTitle || "Untitled";
    const sanitizedTitle = fetchedTitle
      .replace(/[\\/:*?"<>|]/g, "-")
      .replace(/\s+/g, " ");
      
    // Only rename if the new name is different, to avoid file flicker
    if (currentFile.name !== `${sanitizedTitle}.md`) {
       await tp.file.rename(sanitizedTitle);
    }

    // 2. UPDATE CONTENT (only for web articles)
    // If it's a Drive File or Playlist, we *don't* run this
    if (!isDriveFile && !isPlaylist && metadata) {
      // Re-build the content for the default web article
      const finalFrontmatter = `---
tags:
- resources/articles
---`;
      const finalBody = `\`\`\`embed
title: "${fetchedTitle}"
image: "${
        metadata.image ||
        previewURL ||
        "https://blog.tubikstudio.com/wp-content/uploads/2020/05/lumen-museum-website-design.jpg"
      }"
description: "${metadata.description || siteName || "Web Article"}"
url: "${articleURL}"
\`\`\``;
      
      const finalContent = `${finalFrontmatter}\n\n${finalBody}\n`;
      await app.vault.modify(currentFile, finalContent);
    }
  })(); // Execute the background task immediately

  
  // --- PART 3: Return the INITIAL content ---

  // 4. Google Drive Files
  // This is now FINAL content, returned instantly
  if (isDriveFile) {
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
    return `${frontmatter}\n\n${body}\n`;
  }
  
  // 5. YouTube Playlists
  // This is also FINAL content, returned instantly
  if (isPlaylist) {
    const playlistId = articleURL.split("?list=")[1].split("&")[0];
    frontmatter = `---
tags:
- resources/videos
---`;
    // We use the 'articleTitle' as a temp title, or just "YouTube"
    body = `<iframe width="100%" height="100%" max-height="400px" style="aspect-ratio:1.7691 / 1" src="https://www.youtube.com/embed/videoseries?list=${playlistId}" title="${articleTitle || 'YouTube video player'}" frameborder="0"sandbox="allow-forms allow-presentation allow-same-origin allow-popups-to-escape-sandbox allow-scripts allow-modals allow-popups" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    return `${frontmatter}\n\n${body}\n`;
  }

  // 6. Default Web Articles
  // This is the ONLY one that returns a placeholder
  return buildPlaceholderContent(articleTitle, previewURL, siteName, articleURL);
};

module.exports = embedReadable;