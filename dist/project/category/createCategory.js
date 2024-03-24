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

// src/project/category/createCategory.ts
var createCategory_exports = {};
__export(createCategory_exports, {
  createCategory: () => createCategory
});
module.exports = __toCommonJS(createCategory_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/project/category/createCategory.ts
async function createCategory(req, res) {
  try {
    const { userId } = req.params;
    const { name } = req.body;
    if (Number(userId)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      const verifyCategory = await prisma.category.findUnique({
        where: { name: name.toLowerCase() }
      });
      if (verifyCategory) {
        return res.status(500).json({ error: "Category already exists!" });
      }
      const category = await prisma.category.create({
        data: { name: name.toLowerCase(), User_id: Number(userId) }
      });
      return res.status(201).json(category);
    } else {
      return res.status(404).json({ error: "User does not exist!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCategory
});
