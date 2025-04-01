const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { _id: false } // Prevents generating _id for nested lecture docs
);

const CourseContentSchema = new mongoose.Schema(
  {
    sectionTitle: {
      type: String,
      required: true,
    },
    lectures: [LectureSchema],
  },
  { _id: false } // Prevents _id for sections
);

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    default: "no-photo.jpg",
  },
  whatYouWillLearn: {
    type: [String],
    default: [],
  },
  courseContent: {
    type: [CourseContentSchema],
    default: [],
  },
});

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);

  const averageCost = obj[0]
    ? Math.ceil(obj[0].averageCost / 10) * 10
    : undefined;
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost,
    });
  } catch (err) {
    console.log(err);
  }
};

// Call getAverageCost after save
CourseSchema.post("save", async function () {
  try {
    await this.constructor.getAverageCost(this.bootcamp);
  } catch (err) {
    console.error(err);
  }
});

// Call getAverageCost after remove
CourseSchema.post("remove", async function () {
  try {
    await this.constructor.getAverageCost(this.bootcamp);
  } catch (err) {
    console.error(err);
  }
});

// Call getAverageCost after tuition update
CourseSchema.post("findOneAndUpdate", async function (doc) {
  if (this.tuition != doc.tuition) {
    await doc.constructor.getAverageCost(doc.bootcamp);
  }
});

module.exports = mongoose.model("Course", CourseSchema);
