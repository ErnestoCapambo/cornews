"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/project/user/removeAdmin.ts
var removeAdmin_exports = {};
__export(removeAdmin_exports, {
  removeAdmin: () => removeAdmin
});
module.exports = __toCommonJS(removeAdmin_exports);

// src/project/user/createUser.ts
var import_client = require("@prisma/client");

// src/project/auth/login.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var secretKey = "67f8c5or2f485fc331ba3f29f34af97a6622b1b68c76e383322d034b06b91a89484a936c406296234bb883462dgfhjposxks56765ws43186d849cne775d6cc9b38dbeb3af43ae2c4e0da6d11855b0";

// src/project/user/createUser.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var prisma = new import_client.PrismaClient();

// src/project/auth/verifyToken.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ error: "Token not given!" });
  import_jsonwebtoken3.default.verify(token, secretKey, (err, user) => {
    if (err)
      return res.status(403).json({ error: "Invalid token!" });
    req.user = user;
    next();
  });
}

// src/project/user/removeAdmin.ts
async function removeAdmin(req, res) {
  try {
    verifyToken(req, res, async () => {
      const { usId } = req.params;
      const userId = req.user && req.user.id;
      if (Number(usId)) {
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
        const user = await prisma.user.updateMany({
          where: { id: Number(usId) },
          data: { is_admin: 0 }
        });
        if (user.count <= 0) {
          return res.status(404).json({ error: "User does not exist!" });
        }
        return res.status(200).json({ sucsess: "Removed sucsessfuly!" });
      } else {
        return res.status(500).json({
          error: "You must set the parameter of ${userId} as number!"
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Error while removing admin", details: err });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeAdmin
});
