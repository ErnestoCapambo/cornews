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

// src/project/partnership/deletePartnership.ts
var deletePartnership_exports = {};
__export(deletePartnership_exports, {
  deletePartnership: () => deletePartnership
});
module.exports = __toCommonJS(deletePartnership_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/partnership/deletePartnership.ts
async function deletePartnership(req, res) {
  try {
    const { userId, Id } = req.params;
    if (!userId || !Id) {
      return res.status(500).json({ error: "You must set the userId and partnershipId to delete." });
    }
    if (Number(userId), Number(Id)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      const partnership = await prisma.partnership.deleteMany({
        where: { id: Number(Id) }
      });
      if (partnership.count <= 0) {
        return res.status(404).json({ error: "Does not exist!" });
      }
      return res.status(200).json({ sucsess: "Deleted sucsessfuly!" });
    } else {
      return res.status(500).json({ error: "Id must be a number!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while deleting partnership!", details: err });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deletePartnership
});
