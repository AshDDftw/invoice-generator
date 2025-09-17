const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  fileType: {
    type: String,
    required: true,
    enum: ['pdf', 'doc', 'docx', 'txt', 'image', 'other']
  },
  fileSize: {
    type: Number,
    required: true
  },
  content: {
    type: String // Base64 encoded content
  },
  tags: [String],
  version: {
    type: Number,
    default: 1
  },
  isShared: {
    type: Boolean,
    default: false
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);