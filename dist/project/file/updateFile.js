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

// src/project/file/updateFile.ts
var updateFile_exports = {};
__export(updateFile_exports, {
  updateFile: () => updateFile
});
module.exports = __toCommonJS(updateFile_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/file/updateFile.ts
async function updateFile(req, res) {
  try {
    const { userId, Id } = req.params;
    const { title, description, category } = req.body;
    if (!Id) {
      return res.status(500).json({ error: "You must set the parameter /${fileId} to update a file." });
    }
    if (Number(userId), Number(Id)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ unauthorized: "Unauthorized!" });
      }
      const file = await prisma.file.update({
        where: { id: Number(Id) },
        data: {
          title,
          description,
          category,
          file_path: req.file?.path
        }
      });
      if (file === null) {
        return res.status(404).json({ error: "File not found!" });
      }
      return res.status(200).json({ sucsess: "Updated sucsessfuly!" });
    } else {
      return res.status(500).json({ error: "You must set the parameter of ${fileId} as number!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while updaing file!", details: err });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateFile
});
