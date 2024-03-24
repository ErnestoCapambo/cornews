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

// src/project/user/removeAdmin.ts
var removeAdmin_exports = {};
__export(removeAdmin_exports, {
  removeAdmin: () => removeAdmin
});
module.exports = __toCommonJS(removeAdmin_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/user/removeAdmin.ts
async function removeAdmin(req, res) {
  try {
    const { userId, usId } = req.params;
    if (Number(userId) && Number(usId)) {
      const isSuper = await prisma.user.findUnique({
        where: {
          id: Number(usId),
          is_super: 1
        }
      });
      if (isSuper) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      const noAdmin = await prisma.user.findUnique({
        where: { id: Number(userId), is_admin: 0 }
      });
      if (noAdmin) {
        return res.status(401).json({ error: "You must be an Admin!" });
      }
      const user = await prisma.user.update({
        where: { id: Number(usId) },
        data: { is_admin: 0 }
      });
      if (user === null) {
        return res.status(404).json({ error: "User does not exist!" });
      }
      return res.status(200).json({ sucsess: "Removed sucsessfuly!", user });
    } else {
      return res.status(500).json({ error: "You must set the parameters of ${userId} and ${useId} as number!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while removing admin", details: err });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeAdmin
});
