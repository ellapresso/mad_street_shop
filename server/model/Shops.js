const mongoose = require("mongoose");
const moment = require("moment");
const currentTime = moment().format("YYYY-MM-DD h:mm:ssa");
const ShopsSchema = new mongoose.Schema({
  shopName: String,
  shopOwner: String,
  ownerName: String,
  ownerMobile: String,
  userMobile: Boolean,
  shopTags: Object,
  openDays: { type: Array, default: null },
  openTime: { type: String, default: null },
  closeTime: { type: String, default: null },
  location: {
    longitude: { type: mongoose.Types.Decimal128, default: null },
    latitude: { type: mongoose.Types.Decimal128, default: null }
  },
  ownerComment: { type: String, default: "감사합니다." },
  likeScore: { type: Number, default: 0 },
  imageUrl: Array,
  now: {
    active: { type: Boolean, default: false },
    location: {
      longitude: mongoose.Types.Decimal128,
      latitude: mongoose.Types.Decimal128
    },
    openTime: Date,
    closeTime: Date
  },
  createdAt: { type: String, default: currentTime },
  updatedAt: { type: Date, default: null },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
});

const Shops = mongoose.model("Shops", ShopsSchema, "Shops");

module.exports = Shops;
