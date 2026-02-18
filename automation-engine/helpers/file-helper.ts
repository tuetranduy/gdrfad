import path from "path";
import fs from "fs";

export async function moveAndGetFileName(sourcePath: string, destinationPath: string): Promise<string> {
    fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err) throw err;
        console.log(`${path.basename(sourcePath)} was copied to ${path.basename(destinationPath)}`);
    });

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await wait(1000);

    return path.basename(destinationPath);
}