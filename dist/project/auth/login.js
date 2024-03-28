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

// src/project/auth/login.ts
var login_exports = {};
__export(login_exports, {
  login: () => login,
  secretKey: () => secretKey
});
module.exports = __toCommonJS(login_exports);
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_dotenv = __toESM(require("dotenv"));

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var prisma = new import_client.PrismaClient();

// src/project/auth/login.ts
import_dotenv.default.config();
var secretKey = "67f8c5or2f485fc331ba3f29f34af97a6622b1b68c76e383322d034b06b91a89484a936c406296234bb883462dgfhjposxks56765ws43186d849cne775d6cc9b38dbeb3af43ae2c4e0da6d11855b0";
async function login(req, res) {
  const { userId } = req.body;
  if (!Number(userId)) {
    return res.status(401).json({ error: "You must set the userId!" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }
    });
    if (user) {
      const token = import_jsonwebtoken2.default.sign(
        {
          id: user.id,
          email: user.email,
          is_super: user.is_super,
          admin: user.is_admin,
          active: true
        },
        secretKey,
        { expiresIn: "12h" }
      );
      const activeUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: { is_active: 1 }
      });
      return res.status(200).json({ token, user: activeUser });
    }
    if (user == null) {
      return res.status(401).json({ error: "Credenciais invalidas!" });
    }
  } catch (err) {
    return res.status(404).json(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  login,
  secretKey
});
