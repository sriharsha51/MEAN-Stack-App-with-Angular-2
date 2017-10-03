const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema; 


let titleLengthChecker = (title) => {
  if (!title) {
    return false; // Return error
  } else {
    // Check the length of title
    if (title.length < 5 || title.length > 50) {
      return false; 
    } else {
      return true; 
    }
  }
};


let alphaNumericTitleChecker = (title) => {
  if (!title) {
    return false;
  } else {
    // Regular expression to test for a valid title
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title); 
  }
};

// Array of Title Validators
const titleValidators = [
  {
    validator: titleLengthChecker,
    message: 'Title must be more than 5 characters but no more than 50'
  },
  {
    validator: alphaNumericTitleChecker,
    message: 'Title must be alphanumeric'
  }
];

// Validate Function to check body length
let bodyLengthChecker = (body) => {
  if (!body) {
    return false; 
  } else {
    if (body.length < 5 || body.length > 500) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid body
    }
  }
};

const bodyValidators = [
  {
    validator: bodyLengthChecker,
    message: 'Body must be more than 5 characters but no more than 500.'
  }
];

// Validate Function to check comment length
let commentLengthChecker = (comment) => {
  if (!comment[0]) {
    return false; 
  } else {
      if (comment[0].length < 1 || comment[0].length > 200) {
      return false; // Return error if comment length requirement is not met
    } else {
      return true;
    }
  }
};

// Array of Comment validators
const commentValidators = [
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];

// Blog Model Definition
const blogSchema = new Schema({
  title: { type: String, required: true, validate: titleValidators },
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  comments: [{
    comment: { type: String, validate: commentValidators },
    commentator: { type: String }
  }]
});

module.exports = mongoose.model('Blog', blogSchema);