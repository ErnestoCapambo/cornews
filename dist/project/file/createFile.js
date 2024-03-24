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

// src/project/file/createFile.ts
var createFile_exports = {};
__export(createFile_exports, {
  createFile: () => createFile
});
module.exports = __toCommonJS(createFile_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/file/createFile.ts
async function createFile(req, res) {
  try {
    const { title, description, category } = req.body;
    const { userId } = req.params;
    if (!userId) {
      return res.status(500).json({ error: "Params userId is missing!" });
    }
    if (!Number(userId)) {
      return res.status(500).json({ error: "You must set the parameter of ${userId} as a number!" });
    }
    const isAdmin = await prisma.user.findUnique({
      where: { id: Number(userId), is_admin: 1 }
    });
    const isSuper = await prisma.user.findUnique({
      where: { id: Number(userId), is_super: 1 }
    });
    if (isSuper === null || isAdmin === null) {
      return res.status(401).json({ unauthorized: "Unauthorized!" });
    }
    const findCategory = await prisma.category.findUnique({
      where: { name: category.toLowerCase() }
    });
    if (!findCategory) {
      return res.status(500).json({ error: "Invalid category!" });
    }
    const newFile = await prisma.file.create({
      data: {
        title,
        description,
        file_path: String(req.file?.path),
        User_id: Number(userId),
        accepted: 1,
        category: category.toLowerCase()
      }
    });
    return res.status(200).json(newFile);
  } catch (err) {
    return res.status(500).json({ error: "Error while creating file.", details: err });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createFile
});
