const helpers = {
	eq: function (v1: any, v2: any, options: any) {
		return v1 === v2 ? options.fn(this) : options.inverse(this);
	},
	ne: function (v1: any, v2: any, options: any) {
		return v1 !== v2 ? options.fn(this) : options.inverse(this);
	},
	lt: function (v1: any, v2: any, options: any) {
		return v1 < v2 ? options.fn(this) : options.inverse(this);
	},
	gt: function (v1: any, v2: any, options: any) {
		return v1 > v2 ? options.fn(this) : options.inverse(this);
	},
	lte: function (v1: any, v2: any, options: any) {
		return v1 <= v2 ? options.fn(this) : options.inverse(this);
	},
	gte: function (v1: any, v2: any, options: any) {
		return v1 >= v2 ? options.fn(this) : options.inverse(this);
	},
	and: function (v1: any, v2: any, options: any) {
		return v1 && v2 ? options.fn(this) : options.inverse(this);
	},
	or: function (v1: any, v2: any, options: any) {
		return v1 || v2 ? options.fn(this) : options.inverse(this);
	},
	times: function (n: any, block: any) {
		var accum = "";
		for (var i = 0; i < n; ++i) accum += block.fn(i);
		return accum;
	},
};

export default helpers;
