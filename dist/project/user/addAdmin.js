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

// src/project/user/addAdmin.ts
var addAdmin_exports = {};
__export(addAdmin_exports, {
  addAdmin: () => addAdmin
});
module.exports = __toCommonJS(addAdmin_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/user/addAdmin.ts
async function addAdmin(req, res) {
  try {
    const { adminId, userId } = req.params;
    if (Number(adminId) && Number(userId)) {
      const isAdmin = await prisma.user.findUnique({
        where: {
          id: Number(adminId),
          is_admin: 1
        }
      });
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(adminId), is_super: 1 }
      });
      if (isAdmin || isSuper) {
        const admin = await prisma.user.update({
          where: { id: Number(userId) },
          data: { is_admin: 1 }
        });
        if (admin === null) {
          return res.status(404).json({ error: "User does not exist!" });
        }
        return res.status(200).json({ sucsess: "Added sucsessfuly!", user: admin });
      } else {
        return res.status(401).json({ error: "You must be an Admin." });
      }
    } else {
      return res.status(500).json({ error: "You must set the parameters of ${adminId}/${useId} as number!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while adding admin ", err });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addAdmin
});
