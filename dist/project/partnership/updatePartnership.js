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

// src/project/partnership/updatePartnership.ts
var updatePartnership_exports = {};
__export(updatePartnership_exports, {
  updatePartnership: () => updatePartnership
});
module.exports = __toCommonJS(updatePartnership_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/partnership/updatePartnership.ts
async function updatePartnership(req, res) {
  try {
    const { title, description } = req.body;
    const { userId, Id } = req.params;
    if (!Id) {
      return res.status(500).json({ error: "You must set the Id to update the partnership." });
    }
    if (Number(userId), Number(Id)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      const updatedPartnership = await prisma.partnership.update({
        where: { id: Number(Id) },
        data: { title, description, file_path: req.file?.path }
      });
      if (updatedPartnership === null) {
        return res.status(404).json({ error: "Does not exist!" });
      }
      return res.status(200).json({ sucsess: updatedPartnership });
    } else {
      return res.status(500).json({ error: "Id must be a number!" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updatePartnership
});
