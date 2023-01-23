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
    try {
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
    } catch (err) {
      console.error(err);
      break;
    }
  }
  return totalLength;
}

async function main() {
  // Set the path of the folder to process
  const folderPath =
    "C:\\Users\\dell\\Desktop\\[TutsNode.com] - Complete Machine Learning & Data Science Bootcamp 2021";
  // "D:\\Restaurant excel\\Torrent\\Tutorials\\Complete Machine Learning & Data Science Bootcamp 2021\\[TutsNode.com] - Complete Machine Learning & Data Science Bootcamp 2021";
  // "D:\\Restaurant excel\\Torrent\\Tutorials\\[TutsNode.com] - JavaScript The Advanced Concepts";
  // "D:\\Restaurant excel\\Torrent\\Tutorials\\Complete React Native in 2021 Zero to Mastery with Hooks\\[TutsNode.com] - Complete React Native in 2021 Zero to Mastery with Hooks";
  // "D:\\Restaurant excel\\Torrent\\Tutorials\\The Complete Junior to Senior Web Developer Roadmap";
  // "D:\\Restaurant excel\\Torrent\\Tutorials\\[FreeCourseSite.com] Udemy - SQL and PostgreSQL The Complete Developer's Guide";
  // "D:\\Restaurant excel\\Torrent\\Tutorials\\Infrastructure as Code, Master AWS Cloud Development Kit CDK";
  // "D:\\Restaurant excel\\Torrent\\Tutorials\\[TutsNode.com] - TensorFlow Developer Certificate in 2021 Zero to Mastery";
  // "D:\\Restaurant excel\\Torrent\\Tutorials\\[FreeCourseSite.com] Udemy - SQL and PostgreSQL The Complete Developer's Guide";
  // "C:\\Users\\dell\\Desktop\\Work\\Courses\\[TutsNode.com] - Complete Python Developer in 2021 Zero to Mastery";
  // "C:\\Users\\dell\\Desktop\\Work\\Courses\\Master the Coding Interview Data Structures + Algorithms\\[TutsNode.com] - Master the Coding Interview Data Structures + Algorithms";
  // Set the start index for the subfolders
  const startIndex = 0;
  const totalLength = await processFolders(folderPath, startIndex);
  const watchEachDay = 5;
  const totalLengthInHours = totalLength / 3600;
  console.log(`Total lengthof videos: ${totalLengthInHours} hours
  `);

  console.log(
    `If video watched for ${watchEachDay} hours everyday, it will take ${
      totalLengthInHours / watchEachDay
    } days to finish this course`
  );
}

main();
