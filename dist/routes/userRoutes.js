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

// src/routes/userRoutes.ts
var userRoutes_exports = {};
__export(userRoutes_exports, {
  default: () => userRoutes_default,
  router: () => router
});
module.exports = __toCommonJS(userRoutes_exports);
var import_express = require("express");

// src/project/user/createUser.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
async function createUser(req, res) {
  try {
    const { password } = req.body;
    if (password.length < 8) {
      return res.status(500).json({ error: "Password can't be less than 8 charactheres." });
    }
    const veryfyUser = await prisma.user.count();
    if (veryfyUser > 0) {
      const NewUser = req.body;
      const user = await prisma.user.create({
        data: NewUser
      });
      return res.status(201).json(user);
    } else {
      const { username, password: password2, email, contact } = req.body;
      const NewUser = await prisma.user.create({
        data: {
          username,
          password: password2,
          contact,
          email,
          is_super: 1,
          is_admin: 1
        }
      });
      return res.status(201).json(NewUser);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

// src/project/user/getUser.ts
async function getUser(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    }
    if (Number(userId)) {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
      });
      if (user === null) {
        return res.status(404).json({ notfound: "User not found!" });
      }
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ notfound: "User not found!" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

// src/project/user/updateUser.ts
async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const updatedUser = req.body;
    if (Number(userId)) {
      const changedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: updatedUser
      });
      return res.status(200).json(changedUser);
    } else {
      return res.status(404).json({ notfound: "User not found!" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

// src/project/user/deleteUser.ts
async function deleteUser(req, res) {
  try {
    const { userId, usId } = req.params;
    if (Number(userId), Number(usId)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ unauthorized: "Unauthorized!" });
      }
      const user = await prisma.user.delete({
        where: { id: Number(usId) }
      });
      if (user) {
        return res.status(200).json({ sucsess: "Sucessfull deleted!" });
      } else {
        return res.status(404).json({ notfound: "Invalid user." });
      }
    } else {
      return res.status(404).json({ notfound: "User not found!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while deleting user!", details: err });
  }
}

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

// src/project/user/blockUser.ts
async function blockUser(req, res) {
  try {
    const { userId, usId } = req.params;
    if (Number(userId) && Number(usId)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      const blocked = await prisma.user.update({
        where: { id: Number(usId) },
        data: { is_blocked: 1 }
      });
      if (blocked === null) {
        return res.status(404).json({ error: "Invalid User!" });
      }
      return res.status(200).json({ sucsess: "Blocked sucsessfully.", user: blocked });
    } else {
      return res.status(500).json({ error: "Please, verify the user Id!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while blocking user", details: err });
  }
}

// src/project/user/unlockUser.ts
async function unlockUser(req, res) {
  try {
    const { userId, usId } = req.params;
    if (Number(userId) && Number(usId)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      const unlocked = await prisma.user.update({
        where: { id: Number(usId) },
        data: { is_blocked: 0 }
      });
      if (unlocked === null) {
        return res.status(404).json({ error: "Invalid User!" });
      }
      return res.status(200).json({ sucsess: "Unlocked sucsessfully.", user: unlocked });
    } else {
      return res.status(500).json({ error: "Please, verify the user Id!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while unlocking user", details: err });
  }
}

// src/routes/userRoutes.ts
var router = (0, import_express.Router)();
router.post("/create_user", createUser);
router.get("/get_user/:userId?", getUser);
router.put("/update_user/:userId", updateUser);
router.delete("/delete_user/:userId/:usId", deleteUser);
router.put("/add_admin/:adminId?/:userId?", addAdmin);
router.put("/remove_admin/:userId?/:usId?", removeAdmin);
router.put("/block_user/:userId?/:usId?", blockUser);
router.put("/unlock_user/:userId?/:usId?", unlockUser);
var userRoutes_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
