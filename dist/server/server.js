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

// src/server/server.ts
var server_exports = {};
__export(server_exports, {
  app: () => app
});
module.exports = __toCommonJS(server_exports);
var import_express2 = __toESM(require("express"));

// src/routes/userRoutes.ts
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

// src/project/category/deleteCategory.ts
async function deleteCategory(req, res) {
  try {
    const { userId, Id } = req.params;
    if (Number(Id)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      const category = await prisma.category.deleteMany({
        where: { id: Number(Id) }
      });
      return res.status(200).json({ sucsess: "Deleted sucsessfuly!" });
    } else {
      return res.status(500).json({ error: "You must set the parameter of ${CategoryId} as number!" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

// src/project/category/getCategory.ts
async function getCategory(req, res) {
  try {
    const { Id } = req.params;
    if (!Id) {
      const allcategory = await prisma.category.findMany();
      return res.status(200).json(allcategory);
    }
    if (Number(Id)) {
      const category = await prisma.category.findMany({
        where: { id: Number(Id) }
      });
      if (category.length <= 0) {
        return res.status(404).json({ notfound: "Not found!" });
      }
      return res.status(200).json(category);
    } else {
      if (Id) {
        const namecategory = await prisma.category.findUnique({
          where: {
            name: Id
          }
        });
        if (namecategory === null) {
          return res.status(404).json({ notfound: "Not found!" });
        }
        return res.status(200).json(namecategory);
      }
      return res.status(404).json({ notfound: "Not found!" });
    }
  } catch (err) {
    return res.status(404).json(err);
  }
}

// src/project/category/updateCategory.ts
async function updateCategory(req, res) {
  const { userId, Id } = req.params;
  try {
    if (Number(userId) && Number(Id)) {
      const { name } = req.body;
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      const update_category = await prisma.category.updateMany({
        where: { id: Number(Id) },
        data: { name }
      });
      if (update_category.count <= 0) {
        return res.status(404).json({ error: "Does not exist!" });
      }
      return res.status(200).json({ sucsess: "Updated sucsessfuly!" });
    } else {
      return res.status(500).json({ error: "You must set the parameters of ${UserId}/${CategoryId} as number!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Does not exist!" });
  }
}

// src/routes/categoryRoutes.ts
userRoutes_default.post("/create_category/:userId", createCategory);
userRoutes_default.get("/get_category/:Id?", getCategory);
userRoutes_default.put("/update_category/:userId?/:Id?", updateCategory);
userRoutes_default.delete("/delete_category/:userId?/:Id?", deleteCategory);
var categoryRoutes_default = userRoutes_default;

// src/middlewares/fileUpload.ts
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var uploadsFolder = import_path.default.resolve("./src/uploads");
var storage = import_multer.default.diskStorage({
  destination: uploadsFolder,
  filename: function(req, file, callback) {
    let nome = Date.now() + "-" + file.originalname;
    callback(null, nome);
  }
});
var upload = (0, import_multer.default)({ storage });
var fileUpload_default = upload;

// src/project/file/createFile.ts
async function createFile(req, res) {
  try {
    const { title, description, category } = req.body;
    const { userId } = req.params;
    if (!userId) {
      return res.status(500).json({ error: "Params userId is missing!" });
    }
    if (!Number(userId)) {
      return res.status(500).json({ error: "You must set the parameter of ${userId} as a number!" });
    }
    const isAdmin = await prisma.user.findUnique({
      where: { id: Number(userId), is_admin: 1 }
    });
    const isSuper = await prisma.user.findUnique({
      where: { id: Number(userId), is_super: 1 }
    });
    if (isSuper === null || isAdmin === null) {
      return res.status(401).json({ unauthorized: "Unauthorized!" });
    }
    const findCategory = await prisma.category.findUnique({
      where: { name: category.toLowerCase() }
    });
    if (!findCategory) {
      return res.status(500).json({ error: "Invalid category!" });
    }
    const newFile = await prisma.file.create({
      data: {
        title,
        description,
        file_path: String(req.file?.path),
        User_id: Number(userId),
        accepted: 1,
        category: category.toLowerCase()
      }
    });
    return res.status(200).json(newFile);
  } catch (err) {
    return res.status(500).json({ error: "Error while creating file.", details: err });
  }
}

// src/project/file/deleteFile.ts
async function deleteFile(req, res) {
  try {
    const { userId, Id } = req.params;
    if (Number(userId) && Number(Id)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ unauthorized: "Unauthorized!" });
      }
      const file = await prisma.file.delete({
        where: { id: Number(Id) }
      });
      if (file === null) {
        return res.status(404).json({ error: "File does not exist." });
      }
      return res.status(200).json({ sucsess: "Deleted sucsessfuly!" });
    } else {
      return res.status(500).json({ error: "You must set the parameter of ${userId}/${fileId} as number!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while deleting file!", details: err });
  }
}

// src/project/file/getFile.ts
async function getFiles(req, res) {
  try {
    const { Id } = req.params;
    if (!Id) {
      const files = await prisma.file.findMany();
      if (files.length <= 0) {
        return res.status(404).json({ empty: "No file detected!" });
      }
      return res.status(200).json(files);
    }
    if (Number(Id)) {
      const file = await prisma.file.findUnique({
        where: { id: Number(Id) }
      });
      if (file === null) {
        return res.status(404).json({ err: "File not found!" });
      }
      return res.status(200).sendFile(file.file_path);
    } else {
      return res.status(500).json({ error: "You must set the parameter of ${fileId} as number!" });
    }
  } catch (err) {
    return res.status(404).json(err);
  }
}

// src/project/file/updateFile.ts
async function updateFile(req, res) {
  try {
    const { userId, Id } = req.params;
    const { title, description, category } = req.body;
    if (!Id) {
      return res.status(500).json({ error: "You must set the parameter /${fileId} to update a file." });
    }
    if (Number(userId), Number(Id)) {
      const isSuper = await prisma.user.findUnique({
        where: { id: Number(userId), is_super: 1 }
      });
      if (isSuper === null) {
        return res.status(401).json({ unauthorized: "Unauthorized!" });
      }
      const file = await prisma.file.update({
        where: { id: Number(Id) },
        data: {
          title,
          description,
          category,
          file_path: req.file?.path
        }
      });
      if (file === null) {
        return res.status(404).json({ error: "File not found!" });
      }
      return res.status(200).json({ sucsess: "Updated sucsessfuly!" });
    } else {
      return res.status(500).json({ error: "You must set the parameter of ${fileId} as number!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error while updaing file!", details: err });
  }
}

// src/routes/fileRoutes.ts
userRoutes_default.post("/create_file/:userId?", fileUpload_default.single("file"), createFile);
userRoutes_default.get("/get_file/:Id?", getFiles);
userRoutes_default.delete("/delete_file/:userId?/:Id?", deleteFile);
userRoutes_default.put("/update_file/:userId?/:Id?", fileUpload_default.single("file"), updateFile);
var fileRoutes_default = userRoutes_default;

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

// src/routes/partnershipRoutes.ts
userRoutes_default.post("/create_partnership/:userId?", fileUpload_default.single("file"), createPartnership);
userRoutes_default.get("/get_partnership/:Id?", getPartnership);
userRoutes_default.put("/update_partnership/:userId?/:Id?", fileUpload_default.single("file"), updatePartnership);
userRoutes_default.delete("/delete_partnership/:userId?/:Id?", deletePartnership);
var partnershipRoutes_default = userRoutes_default;

// src/server/server.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use("/user", userRoutes_default);
app.use("/category", categoryRoutes_default);
app.use("/files", fileRoutes_default);
app.use("/partnership", partnershipRoutes_default);
app.listen(3344, () => {
  console.log("The server is running at port 3344!");
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
