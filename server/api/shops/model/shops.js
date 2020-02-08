const mongoose = require("mongoose");

const ShopsSchema = new mongoose.Schema({
	shopName: String,
	shopOwner: String,
	shopTags: Array,
	openDays: Array,
	openTime: Date,
	closeTime: Date,
	location: {
		longitude: mongoose.Types.Decimal128,
		latitude: mongoose.Types.Decimal128
	},
	ownerComment: String,
	likeScore: { type: Number, default: 0 },
	now: {
		active: Boolean,
		real_location: {
			longitude: mongoose.Types.Decimal128,
			latitude: mongoose.Types.Decimal128
		},
		real_start_time: Date,
		set_close_time: Date
	},
	createdAt: { type: Date, default: new Date() },
	updatedAt: { type: Date, default: null },
	deleted: { type: Boolean, default: null },
	deletedAt: { type: Date, default: null }
});

global.Shops = global.Shops || mongoose.model("shops", ShopsSchema);
const Shops = mongoose.model("shops", ShopsSchema);

module.exports = Shops;
