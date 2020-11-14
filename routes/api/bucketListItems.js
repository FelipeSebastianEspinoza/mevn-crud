const { Router } = require("express");
const { MongoNetworkError } = require("mongodb");
const BucketListItem = require("../../models/BucketListItem");

const router = Router();

router.get("/", async (req, res) => {
  const BucketListItem = await BucketListItem.find();
  if (!BucketListItem) throw MongoNetworkError("No bucketListItems");
});
//11:55