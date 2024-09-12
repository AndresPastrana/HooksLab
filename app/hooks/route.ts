import { readdir, readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest, res: NextResponse) {
  // TODO: Validate and sanity check for the query parameters
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("name");
  if (!query || query.length < 1) {
    return NextResponse.json(
      { error: true, message: "Invalid query" },
      { status: 400 }
    );
  }

  try {
    const searchReg = new RegExp(query, "i");

    // Look for the file coorresponding to the query
    const pt = path.join(process.cwd(), "app", "hooks");
    const hookdir = await readdir(pt, {
      encoding: "utf-8",
      withFileTypes: true,
    });

    const hookFileName = hookdir.filter((hook) => searchReg.test(hook.name))[0];

    if (!hookFileName) {
      return NextResponse.json(
        { error: true, message: "Hook not found" },
        { status: 404 }
      );
    }

    // Get the info of the file
    const hookCode = await readFile(
      path.join(process.cwd(), "app", "hooks", hookFileName.name),
      { encoding: "utf-8" }
    );
    return NextResponse.json(hookCode);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
    console.log("Error getting hook code");
  }
}
