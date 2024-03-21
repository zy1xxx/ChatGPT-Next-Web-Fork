import fs from "fs";
import path from "path";
const url = require("url");
import { NextRequest, NextResponse } from "next/server";

async function handle(req: NextRequest, res: NextResponse) {
  const currentTime = new Date();
  const beijingTime = new Date(currentTime.getTime() + 8 * 60 * 60 * 1000);
  const parsedUrl = url.parse(req.url);
  const queryString = parsedUrl.query;
  // 构建要写入的日志消息
  const logMessage = `${beijingTime} - ${queryString}\n`;

  // 日志文件路径
  const logFilePath = path.join(process.cwd(), "request.log");

  // 将日志消息写入日志文件
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      return NextResponse.json({ body: "Erro" }, { status: 500 });
    }
    console.log("Request logged:", logMessage);
    return NextResponse.json({ body: "OK" }, { status: 200 });
  });
  return NextResponse.json({ body: "OK" }, { status: 200 });
}

export const GET = handle;
// export const runtime = "edge";
