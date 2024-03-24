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

// src/project/partnership/getPartnership.ts
var getPartnership_exports = {};
__export(getPartnership_exports, {
  getPartnership: () => getPartnership
});
module.exports = __toCommonJS(getPartnership_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/partnership/getPartnership.ts
async function getPartnership(req, res) {
  try {
    const { Id } = req.params;
    if (!Id) {
      const partnership = await prisma.partnership.findMany();
      if (partnership.length <= 0) {
        return res.status(200).json({ empty: "Partnership is empty." });
      }
      return res.status(200).json(partnership);
    }
    if (Number(Id)) {
      const partnership = await prisma.partnership.findFirst({
        where: { id: Number(Id) }
      });
      if (partnership === null) {
        return res.status(404).json({ error: "Does not exist!" });
      }
      return res.status(200).json(partnership);
    } else {
      return res.status(500).json({ error: "Id must be a number!" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPartnership
});
