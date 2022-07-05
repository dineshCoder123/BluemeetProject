const mongoose = require("mongoose");

class apiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  answerStatusFilter() {
    if (this.queryString.answerStatus) {
      this.query = this.query.find({
        queryIs: this.queryString.answerStatus,
      });
    }
    return this;
  }
  userRegistrationFilter() {
    if (this.queryString.userRegistrationStatus) {
      this.query = this.query.find({
        userIs: this.queryString.userRegistrationStatus,
      });
    }
    return this;
  }
  eventWiseFilter() {
    if (this.queryString.event) {
      this.query = this.query.find({
        createdForEventId: mongoose.Types.ObjectId(this.queryString.event),
      });
    }
    return this;
  }
  sort() {
    console.log("me sort function has sent the response okay");
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }

    return this;
  }
  ratingFilter() {
    console.log("hey passing from rating filter");
    if (this.queryString.communityRating) {
      const queryObj = this.queryString.communityRating;
      let queryStr = JSON.stringify(queryObj);

      // let queryStr = queryObj;
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      console.log(queryStr);
      console.log(JSON.parse(queryStr));

      const rating = JSON.parse(queryStr);
      this.query = this.query.find({ communityRating: rating });
    }
    return this;
  }

  textFilter() {
    if (this.queryString.text) {
      this.query = this.query
        .find({ $text: { $search: this.queryString.text } })
        .sort({ score: { $meta: "textScore" } });
    }
    return this;
  }
  tagFilter() {
    if (this.queryString.tag) {
      this.query = this.query
        .find({ $text: { $search: this.queryString.tag } })
        .sort({ score: { $meta: "textScore" } });
    }
    return this;
  }
  sponsorFilter() {
    if (this.queryString.sponsorStatus) {
      this.query = this.query
        .find({ $text: { $search: this.queryString.sponsorStatus } })
        .sort({ score: { $meta: "textScore" } });
    }
    return this;
  }
  sessionFilter() {
    if (this.queryString.sessionId) {
      this.query = this.query.find({
        sessions: { $in: mongoose.Types.ObjectId(this.queryString.sessionId) },
      });
    }
    return this;
  }

  categoryWiseFilter() {
    if (this.queryString.category) {
      console.log("i reached category filter");
      const queryArray = this.queryString.category.split(",");
      // let categoryArray = [];
      // categoryArray = queryArray.Map((el) => el);
      // console.log( 1111,typeof queryArray);
      // const a = [1, 2];
      // console.log(typeof a);
      this.query = this.query.find({
        categories: {
          $in: Object.values(queryArray),
        },
      });
    }

    return this;
  }

  dateWiseFilter() {
    if (this.queryString.startDate && this.queryString.endDate) {
      const start_Date = new Date(this.queryString.startDate);

      const end_Date = new Date(this.queryString.endDate);
      this.query = this.query.find({
        $and: [
          { startDate: { $gte: start_Date } },
          {
            endDate: { $lte: end_Date },
          },
        ],
      });
    }
    return this;
  }

  priceWiseFilter() {
    const min_price = this.queryString.min_price * 1;
    const max_price = this.queryString.max_price * 1;
    if (this.queryString.min_price && this.queryString.max_price) {
      this.query = this.query.find({
        $and: [
          {
            minTicketPrice: { $gte: min_price },
          },
          {
            maxTicketPrice: { $lte: max_price },
          },
        ],
      });
    } else if (
      this.queryString.max_price &&
      this.queryString.max_price * 1 == 0
    ) {
      console.log("i reached at this point");
      this.query = this.query.find({
        maxTicketPrice: max_price,
      });
    }

    return this;
  }

  paginate() {
    // console.log(this.query);
    if (this.queryString.page) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 10;
      const skip = (page - 1) * limit;
      console.log(skip);

      

      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
}
module.exports = apiFeatures;
