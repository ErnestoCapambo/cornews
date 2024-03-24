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

// src/project/file/deleteFile.ts
var deleteFile_exports = {};
__export(deleteFile_exports, {
  deleteFile: () => deleteFile
});
module.exports = __toCommonJS(deleteFile_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/file/deleteFile.ts
async function deleteFile(req, res) {
  try {
    const { userId, Id } = req.params;
    if (Number(userId) && Number(Id)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ unauthorized: "Unauthorized!" });
      }
      const file = await prisma.file.delete({
        where: { id: Number(Id) }
      });
      if (file === null) {
        return res.status(404).json({ error: "File does not exist." });
      }
      return res.status(200).json({ sucsess: "Deleted sucsessfuly!" });
    } else {
      return res.status(500).json({ error: "You must set the parameter of ${userId}/${fileId} as number!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while deleting file!", details: err });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteFile
});
