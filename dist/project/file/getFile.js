"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/project/file/getFile.ts
var getFile_exports = {};
__export(getFile_exports, {
  getFiles: () => getFiles
});
module.exports = __toCommonJS(getFile_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/file/getFile.ts
async function getFiles(req, res) {
  try {
    const { Id } = req.params;
    if (!Id) {
      const files = await prisma.file.findMany();
      if (files.length <= 0) {
        return res.status(404).json({ empty: "No file detected!" });
      }
      return res.status(200).json(files);
    }
    if (Number(Id)) {
      const file = await prisma.file.findUnique({
        where: { id: Number(Id) }
      });
      if (file === null) {
        return res.status(404).json({ err: "File not found!" });
      }
      return res.status(200).sendFile(file.file_path);
    } else {
      return res.status(500).json({ error: "You must set the parameter of ${fileId} as number!" });
    }
  } catch (err) {
    return res.status(404).json(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFiles
});
