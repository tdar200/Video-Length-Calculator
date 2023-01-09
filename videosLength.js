const fs = require("fs");
const path = require("path");
const { getVideoDurationInSeconds } = require("get-video-duration");

async function getVideoLength(path) {
  return new Promise((resolve, reject) => {
    // Use getVideoDuration to extract the duration of the video

    getVideoDurationInSeconds(path)
      .then((duration) => {
        // console.log(path, duration);
        resolve(duration);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function processFolder(folderPath) {
  let totalLength = 0;
  // Read the contents of the folder
  const contents = fs.readdirSync(folderPath);
  // Iterate over the contents of the folder
  for (let i = 0; i < contents.length; i++) {
    const itemPath = path.join(folderPath, contents[i]);
    // Check if the item is a folder
    if (fs.statSync(itemPath).isDirectory()) {
      // Process the folder and add the total length to the total
      totalLength += await processFolder(itemPath, 0, Number.MAX_SAFE_INTEGER);
    } else {
      // Check if the item is a video file
      const ext = path.extname(itemPath);
      if (
        ext === ".mp4" ||
        ext === ".avi" ||
        ext === ".mkv" ||
        ext === ".mov"
      ) {
        // Get the length of the video and add it to the total
        totalLength += await getVideoLength(itemPath);
      }
    }
  }
  return totalLength;
}

async function processFolders(folderPath, startIndex) {
  let totalLength = 0;
  // Read the contents of the folder
  const contents = fs.readdirSync(folderPath);
  // Iterate over the subfolders in the folder
  for (let i = 0; i < i < contents.length; i++) {
    if (!contents[i] || !folderPath) break;
    const subfolderPath = path.join(folderPath, contents[i]);
    const digit = `${contents[i][0]}${
      isNaN(Number(contents[i][1])) ? "" : contents[i][1]
    }`;
    // Check if the item is a folder

    if (+digit >= startIndex) {
      if (fs.statSync(subfolderPath).isDirectory()) {
        // Process the subfolder and add the total length to the total
        folderVideoLength = await processFolder(
          subfolderPath,
          0,
          Number.MAX_SAFE_INTEGER
        );
        totalLength += folderVideoLength;

        console.log(contents[i], folderVideoLength / 3600);
      }
    } else {
      totalLength += 0;
    }
  }
  return totalLength;
}

async function main() {
  // Set the path of the folder to process
  const folderPath =
    "C:\\Users\\dell\\Desktop\\Work\\Courses\\Master the Coding Interview Data Structures + Algorithms\\[TutsNode.com] - Master the Coding Interview Data Structures + Algorithms";
  // Set the start index for the subfolders
  const startIndex = 9;

  // Set the end index for the subfolders

  // Get the total length of the videos in the folder and its subfolders
  const totalLength = await processFolders(folderPath, startIndex);

  // Print the total length of the videos in the folder and its subfolders
  console.log(`Total lengthof videos: ${totalLength / 3600} hours
  `);
}

main();
