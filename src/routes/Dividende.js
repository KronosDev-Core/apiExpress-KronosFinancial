var express = require("express"),
  router = express.Router(),
  controller = require("../controller/Dividende");

router
  .route("/dividendes")
  .post((req, res) => {
    controller.Create(req.body, res);
  })
  .get((req, res) => {
    controller.GetAll(res);
  });

router
  .route("/dividende/:_id")
  .get((req, res) => {
    controller.GetOne(req.params._id, res);
  })
  .put((req, res) => {
    controller.Update(req.params._id, req.body, res);
  })
  .delete((req, res) => {
    controller.Delete(req.params, res);
  });

module.exports = router;
