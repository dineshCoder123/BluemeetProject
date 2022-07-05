const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const salesDepartmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us sales Persons first name."],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please tell us sales Persons last name."],
    trim: true,
  },
  salesPersonId: {
    type: String,
    required: [true, "Please provide a sales persons Id"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on .Create() and .Save()
      validator: function (el) {
        return el === this.password; // Checking if the two passwords are same or not
      },
      message: "Password do not match",
    },
  },
  employeeSince: {
    type: Date,
  },
  employeeInfoLastUpdatedAt: {
    type: Date,
    default: Date.now(),
  },
  plansCreated: [
    {
      bill: {
        type: mongoose.Schema.ObjectId,
        ref: "Bill",
      },
      community: {
          type: mongoose.Schema.ObjectId,
          ref: 'Community',
      },
      createdAt: {
          type: Date,
      },
    },
  ],
  passwordChangedAt: {
    type: Date,
  },
});

salesDepartmentSchema.pre("save", async function (next) {
  //Only run this function  if password was actually modified
  if (!this.isModified("password")) {
    return next();
  }
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

salesDepartmentSchema.methods.correctPassword = async function (
  candidatePassword,
  salesPersonPassword
) {
  return await bcrypt.compare(candidatePassword, salesPersonPassword);
};

salesDepartmentSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

const SalesDepartment = mongoose.model("SalesDepartment", salesDepartmentSchema);

module.exports = SalesDepartment;
