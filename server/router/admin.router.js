const express = require("express");
const admin_router = express.Router();
const { adminAuth } = require("../middleware/auth");
const adminController = require("../controller/admin/admin.controller");
const developerController = require("../controller/admin/developer.controller");
const projectController = require("../controller/admin/project.controller");
const serviceController = require("../controller/admin/service.controller");

//? ============================================= Authorization =============================================

admin_router.post("/signin", adminController.signin);
admin_router.get("/get-admin", adminAuth, adminController.getAdmin);

//? ============================================== Dashboard ==============================================

admin_router.get("/list-dashboard", adminAuth, adminController.listDashboard);

//? ============================================== User Manage ==============================================

admin_router.get("/list-user", adminAuth, adminController.listUser);
admin_router.post("/block-user/:userId", adminAuth, adminController.blockUser);
admin_router.post("/unblock-user/:userId", adminAuth, adminController.unblockUser);

//? ============================================== Dev Manage ==============================================

admin_router.get("/dev-request", adminAuth, developerController.devRequest);
admin_router.post("/accept-dev/:devId", adminAuth, developerController.acceptDev);
admin_router.post("/reject-dev/:devId", adminAuth, developerController.rejectDev);
admin_router.post("/remove-dev/:devId", adminAuth, developerController.removeDev);

//? ============================================= Service Manage =============================================

admin_router.get("/list-service", adminAuth, serviceController.listService);
admin_router.post("/insert-service", adminAuth, serviceController.insertService);
admin_router.post("/edit-service/:serviceId", adminAuth, serviceController.editService);
admin_router.post("/service-status/:serviceId", adminAuth, serviceController.serviceStatus);
admin_router.delete("/delete-service/:serviceId", adminAuth, serviceController.deleteService);

//? ============================================= Project Manage =============================================

admin_router.get("/list-project", adminAuth, projectController.listProject);
admin_router.post("/insert-project", adminAuth, projectController.insertProject);
admin_router.post("/edit-project/:projectId", adminAuth, projectController.editProject);
admin_router.post("/project-status/:projectId", adminAuth, projectController.projectStatus);
admin_router.delete("/delete-project/:projectId", adminAuth, projectController.deleteProject);

//? ================================================ Feedback ================================================

admin_router.get("/list-feedback", adminAuth, adminController.listFeedback);

//? ================================================ Settings ================================================

admin_router.post("/update-about/:adminId", adminAuth, adminController.updateAbout);

module.exports = admin_router;
