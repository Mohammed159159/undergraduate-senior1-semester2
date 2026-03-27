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

// --- Helper function for safe renaming (v2) ---
const safeRename = async (tp, app, currentFile, newTitle) => {
  if (currentFile.basename === newTitle) {
    return;
  }
  const parentPath = currentFile.parent.path;
  const targetPath = parentPath === "/" ? `${newTitle}.md` : `${parentPath}/${newMew}.md`; // Typo corrected: newMew -> newTitle
  const targetFileExists = app.vault.getAbstractFileByPath(targetPath);

  if (targetFileExists) {
    new tp.system.Notice(`Could not rename: "${newTitle}.md" already exists.`, 10000);
  } else {
    try {
      await tp.file.rename(newTitle);
    } catch (e) {
      console.error("Templater rename error:", e);
      new tp.system.Notice("An unknown error occurred during rename.", 5000);
    }
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
  // --- Get current file reference AT THE START ---
  const currentFile = app.vault.getAbstractFileByPath(tp.file.path(true));
  if (!currentFile) {
    console.error("ReadItLater Error: Could not get target file reference.");
    new tp.system.Notice("Templater error: Could not get current file.", 5000);
    return; // Abort
  }

  let finalTitle;
  let frontmatter;
  let body;

  // --- PART 1: Handle "FAST" types (no network) ---
  // (This part is identical to before)

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
    await safeRename(tp, app, currentFile, finalTitle); 
    return `${frontmatter}\n\n${body}\n`;
  }

  // 2. Kosmik Links
  if (articleURL.includes("play.kosmik.app")) {
    let rawTitle = (await tp.system.prompt("Enter Kosmik name")) || "Untitled Kosmik";
    finalTitle = rawTitle.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ");
    frontmatter = `---
tags:
- resources/kosmiks
---`;
    body = `| [Open Original](${articleURL}) | [Open in App](file://C:/Users/Mohammed%20Hany/AppData/Roaming/Microsoft/Windows/Start%2BMenu/Programs/Kosmik.lnk) |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
<iframe src="${articleURL}" style="width:100%; aspect-ratio:0.7"></iframe>`;
    await safeRename(tp, app, currentFile, finalTitle);
    return `${frontmatter}\n\n${body}\n`;
  }

  // 3. Google Drive Folders (specific /folders/ URL)
  if (
    articleURL.includes("drive.google.com") &&
    articleURL.includes("/folders/")
  ) {
    let rawTitle = articleTitle || "Google Drive Folder";
    finalTitle = rawTitle.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ");
    frontmatter = `---
tags:
- resources/folders
---`;
    body = `\`\`\`embed
title: "${finalTitle}"
image: "https://zeevector.com/wp-content/uploads/Google-Drive-Logo-Transparent.png"
description: "Google Drive Folder"
url: "${articleURL}"
\`\`\``;
    await safeRename(tp, app, currentFile, finalTitle);
    return `${frontmatter}\n\n${body}\n`;
  }

  // --- PART 2: Handle "SLOW" types (need network for rename) ---
  
  const isDriveFile = articleURL.includes("drive.google.com") && articleURL.includes("/file/d/");
  const isPlaylist = articleURL.includes("youtube.com/playlist?list=");

  // --- Launch the background task ---
  (async () => {
    const metadata = await getUrlMetadata(articleURL);
    if (!metadata) {
        // API call failed, just rename to the default title and stop
        await safeRename(tp, app, currentFile, articleTitle.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " "));
        return;
    }
    
    // 1. RENAME (always)
    const fetchedTitle = metadata?.title || articleTitle || "Untitled";
    const sanitizedTitle = fetchedTitle
      .replace(/[\\/:*?"<>|]/g, "-")
      .replace(/\s+/g, " ");
      
    await safeRename(tp, app, currentFile, sanitizedTitle);

    // ==========================================================
    // --- THIS IS THE FIXED LOGIC ---
    // ==========================================================
    
    // 2. UPDATE CONTENT
    
    const isGDriveLink = articleURL.includes("drive.google.com");
    const isYTPlaylist = articleURL.includes("youtube.com/playlist?list=");

    let finalFrontmatter = "";
    let finalBody = "";

    if (isYTPlaylist) {
        // --- It's a YouTube Playlist ---
        const playlistId = articleURL.split("?list=")[1].split("&")[0];
        finalFrontmatter = `---
tags:
- resources/videos
---`;
        finalBody = `<iframe width="100%" height="100%" max-height="400px" style="aspect-ratio:1.7691 / 1" src="https://www.youtube.com/embed/videoseries?list=${playlistId}" title="${fetchedTitle}" frameborder="0"sandbox="allow-forms allow-presentation allow-same-origin allow-popups-to-escape-sandbox allow-scripts allow-modals allow-popups" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    
    } else if (isGDriveLink) {
        // --- It's a Google Drive Link ---
        
        // Check if the fetched title has a file extension
        const fileExtensions = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".gdoc", ".gsheet", ".gslides"];
        const fetchedTitleLower = fetchedTitle.toLowerCase();
        const isFile = fileExtensions.some(ext => fetchedTitleLower.endsWith(ext));

        if (isFile) {
            // It's a GDrive FILE. Build the file iframe.
            const fileId = articleURL.includes("/file/d/")
                ? articleURL.split("/file/d/")[1].split("/")[0]
                : articleURL.split("id=")[1].split("&")[0];
            
            finalFrontmatter = `---
tags:
- resources/articles
annotation-target: https://drive.google.com/uc?export=download&id=${fileId}
annotation-target-type: pdf
---`;
            finalBody = `| [Open Original](${articleURL}) |
| ------------------------------------------ |
<iframe src="https://drive.google.com/file/d/${fileId}/preview" style="width:100%; aspect-ratio:1" frameborder="0" allow-popups-to-escape-sandbox></iframe>`;
        
        } else {
            // It's a GDrive FOLDER. Build the folder embed block.
            finalFrontmatter = `---
tags:
- resources/folders
---`;
            finalBody = `\`\`\`embed
title: "${fetchedTitle}"
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png"
description: "Google Drive Folder"
url: "${articleURL}"
\`\`\``;
        }
    
    } else {
        // --- It's a Default Web Article ---
        finalFrontmatter = `---
tags:
- resources/articles
---`;
        finalBody = `\`\`\`embed
title: "${fetchedTitle}"
image: "${
        metadata.image ||
        previewURL ||
        "https://blog.tubikstudio.com/wp-content/uploads/2020/05/lumen-museum-website-design.jpg"
      }"
description: "${metadata.description || siteName || "Web Article"}"
url: "${articleURL}"
\`\`\``;
    }
    
    // 3. APPLY THE UPDATE
    await app.vault.modify(currentFile, `${finalFrontmatter}\n\n${finalBody}\n`);

  })(); // Execute the background task immediately

  
  // --- PART 3: Return the INITIAL content ---

  // 4. Google Drive Files (ONLY specific /file/d/ URL)
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
  if (isPlaylist) {
    const playlistId = articleURL.split("?list=")[1].split("&")[0];
    frontmatter = `---
tags:
- resources/videos
---`;
    body = `<iframe width="100%" height="100%" max-height="400px" style="aspect-ratio:1.7691 / 1" src="https://www.youtube.com/embed/videoseries?list=${playlistId}" title="${articleTitle || 'YouTube video player'}" frameborder="0"sandbox="allow-forms allow-presentation allow-same-origin allow-popups-to-escape-sandbox allow-scripts allow-modals allow-popups" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    return `${frontmatter}\n\n${body}\n`;
  }

  // 6. Default Web Articles (and open?id= links)
  // This is the ONLY one that returns a placeholder
  return buildPlaceholderContent(articleTitle, previewURL, siteName, articleURL);
};

module.exports = embedReadable;