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

// src/project/partnership/createPartnership.ts
var createPartnership_exports = {};
__export(createPartnership_exports, {
  createPartnership: () => createPartnership
});
module.exports = __toCommonJS(createPartnership_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/partnership/createPartnership.ts
async function createPartnership(req, res) {
  try {
    const { userId } = req.params;
    const { title, description } = req.body;
    if (!userId) {
      return res.status(500).json({ error: "You must set the ${userId}/ to create the partnership." });
    }
    if (Number(userId)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ unauthorized: "Unauthorized!" });
      }
      const partnership = await prisma.partnership.create({
        data: {
          title,
          description,
          file_path: req.file?.path,
          User_id: Number(userId)
        }
      });
      return res.status(201).json(partnership);
    } else {
      return res.status(500).json({ error: "The ${userId}/ must be a number!" });
    }
  } catch (err) {
    return res.status(500).json(res);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPartnership
});
